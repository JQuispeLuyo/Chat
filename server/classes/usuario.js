// {
//     id,
//     nombre,
//     sala
// }

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, room) {

        let persona = { id, nombre, room };

        this.personas.push(persona);

        return this.getPersonasPorSala(room)

    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasPorSala = this.personas.filter(persona => {
            return persona.room === sala;
        });

        return personasPorSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;

    }

}

module.exports = {
    Usuarios
}