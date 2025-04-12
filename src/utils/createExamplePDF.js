const fs = require('fs-extra');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

/**
 * Cria um PDF de exemplo com três páginas
 * Cada página representa um boleto de um morador
 */
const createExamplePDF = async () => {
  try {
    // Criar pasta para os boletos, se não existir
    const outputDir = path.join(__dirname, '../../uploads');
    await fs.ensureDir(outputDir);
    
    // Criar um novo documento PDF
    const pdfDoc = await PDFDocument.create();
    
    // Adicionar fonte
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Moradores (na ordem inversa como mencionado no desafio)
    const moradores = [
      { nome: 'MARCIA CARVALHO', valor: 'R$ 128,00', lote: '0019' },
      { nome: 'JOSE DA SILVA', valor: 'R$ 182,54', lote: '0017' },
      { nome: 'MARCOS ROBERTO', valor: 'R$ 178,20', lote: '0018' }
    ];
    
    // Criar uma página para cada morador
    for (const morador of moradores) {
      const page = pdfDoc.addPage([595, 842]); // A4
      
      // Título
      page.drawText('BOLETO CONDOMÍNIO GREEN PARK', {
        x: 50,
        y: 800,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      
      // Separador
      page.drawLine({
        start: { x: 50, y: 780 },
        end: { x: 545, y: 780 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      
      // Dados do morador
      page.drawText(`Nome: ${morador.nome}`, {
        x: 50,
        y: 750,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      page.drawText(`Lote: ${morador.lote}`, {
        x: 50,
        y: 730,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      page.drawText(`Valor: ${morador.valor}`, {
        x: 50,
        y: 710,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      // Linha digitável
      page.drawText('Linha Digitável: 123456123456123456', {
        x: 50,
        y: 690,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      // Código de barras (simulação)
      page.drawRectangle({
        x: 50,
        y: 650,
        width: 300,
        height: 30,
        color: rgb(0, 0, 0),
      });
    }
    
    // Salvar o PDF
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(outputDir, 'exemplo-boletos.pdf');
    await fs.writeFile(filePath, pdfBytes);
    
    console.log(`PDF de exemplo criado com sucesso: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Erro ao criar PDF de exemplo:', error);
    throw error;
  }
};

module.exports = createExamplePDF;

// Executar diretamente se este arquivo for chamado diretamente
if (require.main === module) {
  createExamplePDF().catch(console.error);
}