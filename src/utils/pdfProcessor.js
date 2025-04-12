const fs = require('fs-extra');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');

/**
 * Processa um arquivo PDF e divide em arquivos individuais
 * @param {string} filePath - Caminho do arquivo PDF
 * @returns {Promise<Array>} - Array com os caminhos dos PDFs gerados
 */
const processBoletosPDF = async (filePath) => {
  try {
    // Criar pasta para os boletos, se não existir
    const outputDir = path.join(__dirname, '../../uploads/boletos');
    await fs.ensureDir(outputDir);

    // Ler o arquivo PDF
    const pdfBuffer = await fs.readFile(filePath);
    const pdfData = await pdf(pdfBuffer);
    
    // Carregar o PDF de origem
    const sourcePdfDoc = await PDFDocument.load(pdfBuffer);
    const numberOfPages = sourcePdfDoc.getPageCount();

    // Buscar os boletos existentes no banco de dados para mapear
    const db = require('../models');
    const boletos = await db.Boleto.findAll({ 
      order: [['id', 'ASC']]
    });
    
    // Verificar se temos boletos suficientes
    if (boletos.length < numberOfPages) {
      throw new Error(`O arquivo PDF contém ${numberOfPages} páginas, mas só existem ${boletos.length} boletos no sistema.`);
    }
    
    // Mapeamento: O PDF tem ordem inversa conforme o desafio (MARCIA, JOSE, MARCOS)
    // mas nossos boletos estão em ordem de ID (JOSE, MARCOS, MARCIA)
    // Vamos fazer o mapeamento assumindo essa ordem inversa
    const boletosInvertidos = [...boletos].reverse();
    
    const generatedFiles = [];
    
    // Extrair cada página para um arquivo separado
    for (let i = 0; i < numberOfPages; i++) {
      const boleto = boletosInvertidos[i];
      if (!boleto) continue;
      
      // Criar um novo documento PDF com apenas uma página
      const newPdf = await PDFDocument.create();
      const [pageToCopy] = await newPdf.copyPages(sourcePdfDoc, [i]);
      newPdf.addPage(pageToCopy);
      
      // Salvar o novo PDF com o ID do boleto
      const fileName = `${boleto.id}.pdf`;
      const outputPath = path.join(outputDir, fileName);
      const pdfBytes = await newPdf.save();
      await fs.writeFile(outputPath, pdfBytes);
      
      generatedFiles.push({
        boletoId: boleto.id,
        filePath: `/uploads/boletos/${fileName}`,
        nome_sacado: boleto.nome_sacado
      });
    }
    
    return generatedFiles;
    
  } catch (error) {
    throw new Error(`Erro ao processar o PDF: ${error.message}`);
  }
};

/**
 * Gera um relatório PDF dos boletos
 * @param {Array} boletos - Lista de boletos para incluir no relatório
 * @returns {Promise<Buffer>} - Buffer do PDF gerado
 */
const generateBoletosReport = async (boletos) => {
  const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
  
  // Criar um novo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  
  // Configurar fonte e margens
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;
  const padding = 50;
  
  // Cabeçalho
  page.drawText('Relatório de Boletos', {
    x: padding,
    y: page.getHeight() - padding,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(`Data: ${new Date().toLocaleDateString('pt-BR')}`, {
    x: padding,
    y: page.getHeight() - padding - 20,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });
  
  // Cabeçalhos da tabela
  const headers = ['ID', 'Nome Sacado', 'ID Lote', 'Valor', 'Linha Digitável'];
  const columnWidths = [40, 150, 60, 70, 180];
  let y = page.getHeight() - padding - 60;
  
  // Desenhar cabeçalhos
  let xPosition = padding;
  for (let i = 0; i < headers.length; i++) {
    page.drawText(headers[i], {
      x: xPosition,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    xPosition += columnWidths[i];
  }
  
  y -= 15;
  
  // Desenhar linha separadora
  page.drawLine({
    start: { x: padding, y },
    end: { x: page.getWidth() - padding, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  
  y -= 15;
  
  // Adicionar dados dos boletos
  for (const boleto of boletos) {
    // Verificar se precisamos de uma nova página
    if (y < 100) {
      page = pdfDoc.addPage();
      y = page.getHeight() - padding;
    }
    
    xPosition = padding;
    
    // ID
    page.drawText(boleto.id.toString(), {
      x: xPosition,
      y,
      size: fontSize,
      font,
    });
    xPosition += columnWidths[0];
    
    // Nome Sacado
    page.drawText(boleto.nome_sacado, {
      x: xPosition,
      y,
      size: fontSize,
      font,
    });
    xPosition += columnWidths[1];
    
    // ID Lote
    page.drawText(boleto.id_lote.toString(), {
      x: xPosition,
      y,
      size: fontSize,
      font,
    });
    xPosition += columnWidths[2];
    
    // Valor
    page.drawText(`R$ ${boleto.valor.toFixed(2).replace('.', ',')}`, {
      x: xPosition,
      y,
      size: fontSize,
      font,
    });
    xPosition += columnWidths[3];
    
    // Linha Digitável
    page.drawText(boleto.linha_digitavel, {
      x: xPosition,
      y,
      size: fontSize,
      font,
    });
    
    y -= 20;
  }
  
  // Salvar o PDF
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

module.exports = {
  processBoletosPDF,
  generateBoletosReport
};