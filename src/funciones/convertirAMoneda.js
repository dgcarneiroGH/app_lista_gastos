const FormatearCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'es-ES',
        { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    ).format(cantidad);
}

export default FormatearCantidad;