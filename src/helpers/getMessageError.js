
export const getMessageError = (response) => {
    if (response?.msg) return response.msg;
        if (response?.errors) {
            // Buscar msg dentro de cada error (por si es un array o un objeto con claves)
            if (Array.isArray(response.errors)) {
                return response.errors.map(err => err.msg).join('<br> ');
            } else if (typeof response.errors === 'object') {
                return Object.values(response.errors).map(err => err.msg).join('<br> ');
            }
        }
        return 'Error desconocido';
}