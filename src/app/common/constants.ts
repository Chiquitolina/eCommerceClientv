  
export interface ProductCategory {
    destacados: string[];
    calzados: string[];
    ropa: string[];
}

export enum carouselHeaderOptions {
    DESCUENTO_OFF = 'Hasta 50% off en Seleccionados',
    ENVIO_GRATIS = 'Envío gratis a partir de $255.000',
    CUOTAS = 'Hasta 9 cuotas sin interés en Bancos seleccionados',
    LLEGA_MAÑANA = '¡LLega mañana! CABA, GBA y Rosario'
}

export const carouselHeaderObject = [
    {key: carouselHeaderOptions.DESCUENTO_OFF, value: 'Ver productos'},
    {key: carouselHeaderOptions.ENVIO_GRATIS, value: 'Ver productos'},
    {key: carouselHeaderOptions.CUOTAS, value: 'Ver promociones bancarias'},
    {key: carouselHeaderOptions.LLEGA_MAÑANA, value: 'Ver Términos y Condiciones'}
]

export enum productSelectedAccordion {
    ENVIOS_Y_ENTREGAS = 'Devoluciones y Envíos',
    METODOS_DE_PAGO = 'Métodos de pago',
    COMPARTIR = 'Compartir'
}

export const productSelectedAccordionObject = [
    {key: productSelectedAccordion.ENVIOS_Y_ENTREGAS, value: 'Entregas a todo el país. Consultá la fecha estimada de entrega al realizar la compra. Podés devolver tu pedido por cualquier motivo, sin cargo, dentro de un plazo de 30 días.'},
    {key: productSelectedAccordion.METODOS_DE_PAGO, value: 'Aceptamos las siguientes opciones de pago: Tarjetas de Crédito, Tarjetas de Débito y Mercado Pago.'},
    {key: productSelectedAccordion.COMPARTIR, value: ''}
]

export enum Categories {
    CALZADOS = 'Calzados',
    ROPA = 'Ropa'
}

export enum FilterOptions {
    MOST_RELEVANT = 'Más relevante',
    MOST_RECENT = 'Más reciente',
    LOWEST_PRICE = 'Menor precio',
    HIGHEST_PRICE = 'Mayor precio'
}

export enum AccordionFilters {
    SALE = 'Sale',
    SIZE = 'Size',
    CATEGORIES = 'Categories',
    PRICES = 'Prices'
}

export interface AccordionFilter {
    name: AccordionFilters;
    label: string;
    discounts?: number[]; // Opcional para el filtro de 'Sale'
    categories?: Categories[]; // Opcional para el filtro de 'Categories'
  }
  
export const PRODUCT_SIZES: { [key in Categories]: (number | string)[] } = {
    [Categories.CALZADOS]: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14],
    [Categories.ROPA]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
};
  
export const FILTER_OPTIONS_ARRAY = [
    { key: FilterOptions.MOST_RELEVANT, value: 'Más relevante' },
    { key: FilterOptions.MOST_RECENT, value: 'Más reciente' },
    { key: FilterOptions.LOWEST_PRICE, value: 'Menor precio' },
    { key: FilterOptions.HIGHEST_PRICE, value: 'Mayor precio' }
];

export const ACCORDION_FILTERS: AccordionFilter[] = [
    { name: AccordionFilters.SALE, label: 'Sale', discounts: [20, 30, 40, 50] },
    { name: AccordionFilters.CATEGORIES, label: 'Categories', categories: Object.values(Categories) },
    { name: AccordionFilters.PRICES, label: 'Price'},
    { name: AccordionFilters.SIZE, label: 'Size' },
];

export const STORE_NAVBAR_MENU = [
    {"name" : "hombre", 
        "products" :  {
            "destacados": [
                'Ver todo hombre',
                'Lo nuevo',
                'Lo más vendido',
                'Íconos',
                'Jordan',
                'Eventos Nike'
        ],
            "calzados": [
                'Ver todo el calzado',
                'Moda',
                'Jordan',
                'Air Max',
                'Air Force 1',
                'Dunk',
                'Botines',
                'Running',
                'Gym y Entrenamiento',
                'Nike SB',
                'Ojotas y Sandalias',
                'SALE en Calzado'
        ],
            "ropa": [
                'Ver toda la Ropa',
                'Remeras y Camisetas',
                'Shorts',
                'Pantalones y Calzas',
                'Buzos',
                'Camperas',
                'Jordan',
                'Medias',
                'Gorras',
                'SALE en Ropa'
        ],
    }},
    {"name" : "mujer", 
        "products" :  {
            "destacados": [
                'Ver todo Mujer',
                'Lo nuevo',
                'Lo más vendido',
                'Íconos',
                'Jordan',
                'Eventos Nike'
        ],
            "calzados": [
                'Ver todo el calzado',
                'Moda',
                'Jordan',
                'Air Max',
                'Air Force 1',
                'Dunk',
                'Botines',
                'Running',
                'Gym y Entrenamiento',
                'Ojotas y Sandalias',
                'SALE en Calzado'
        ],
            "ropa": [
                'Ver toda la Ropa',
                'Tops Deportivos',
                'Remeras y Camisetas',
                'Calzas',
                'Shorts y Polleras',
                'Pantalones y Calzas',
                'Buzos',
                'Camperas',
                'Maternidad',
                'Jordan',
                'Medias',
                'Gorras',
                'SALE en Ropa'
        ],
    }},   
    {"name" : "ninoa", 
        "products" :  {
            "destacados": [
                'Ver todo hombre',
                'Lo nuevo',
                'Lo más vendido',
                'Íconos',
                'Jordan',
                'Eventos Nike'
        ],
            "calzados": [
                'Ver todo el calzado',
                'Moda',
                'Jordan',
                'Air Max',
                'Air Force 1',
                'Dunk',
                'Botines',
                'Running',
                'Gym y Entrenamiento',
                'Nike SB',
                'Ojotas y Sandalias',
                'SALE en Calzado'
        ],
            "ropa": [
                'Ver toda la Ropa',
                'Remeras y Camisetas',
                'Shorts',
                'Pantalones y Calzas',
                'Buzos',
                'Camperas',
                'Jordan',
                'Medias',
                'Gorras',
                'SALE en Ropa'
        ],
    }},
    {"name" : "sale", 
        "products" :  {
           "destacados": {},
           "calzados": {},
           "ropa": {},
       }} 
]
