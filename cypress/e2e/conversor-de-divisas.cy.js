const URL = "http://localhost:5500/index.html"

context('Conversor de divisas', ()=>{
  
  beforeEach(()=>{
    cy.visit(URL);
  });

  describe('Revision de la interfaz',()=>{
    it('Se asegura que exista un input para la fecha', ()=>{
      cy.get('#fecha-elegida').should('be.empty');
    });

    it('Se asegura que exista una entrada para la base',()=>{
      cy.get('#moneda-base').contains('USD');
    });
    
    it('Se asegura que existan botones', ()=>{
      const cantidadBotones = 2;
      cy.get('.texto-div').find("#boton-aceptar");
      cy.get('.texto-div').find('#mostrar-monedas')
    });

    it('Se asegura que existan las listas', ()=>{
      cy.get('#listas-usadas').find('#lista-monedas-nombres');
      cy.get('#listas-usadas').find('#lista-monedas');
      cy.get('#listas-usadas').find('#errores');
    });
  });

  describe('Comprueba la situacion en la que no hay fecha',()=>{
    it('Prueba el error',()=>{
      cy.get('#boton-aceptar').click();
      cy.get('#errores').should('be.visible');
      cy.get('#errores').should('have.length', 1);
    });

    it('Quita el error',()=>{
      cy.get('#boton-aceptar').click();
      cy.get('#fecha-elegida').type('2024-03-05')
      cy.get('#boton-aceptar').click();
      cy.get('#lista-monedas').should('not.be.empty')
    });
  });

  describe('Comprueba la lista de nombres de monedas', ()=>{
    it('Comprueba que el boton funcione',()=>{
      cy.get('#mostrar-monedas').contains('Mostrar monedas');
      cy.get('#mostrar-monedas').click();
      cy.get('#lista-monedas-nombres').should('be.visible');
      cy.get('#mostrar-monedas').contains('Ocultar monedas');
      cy.get('#mostrar-monedas').click();
      cy.get('#lista-monedas-nombres').should('not.be.visible');
      cy.get('#mostrar-monedas').contains('Mostrar monedas');
    });
  });

  describe('Usa la interfaz',()=>{
    it('Usa todo',()=>{
      cy.get('#mostrar-monedas').click();
      cy.get('#fecha-elegida').type('2024-03-05');
      cy.get('#boton-aceptar').click();
      cy.get('#lista-monedas').should('not.be.empty');
      cy.get('#lista-monedas-nombres').should('not.be.empty');
    });
  });
});