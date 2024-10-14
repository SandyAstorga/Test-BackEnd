import { executeQuery } from './index'; 

// 1. Total de ventas de los últimos 30 días
export const totalSales30Days = async () => {
    const query = `
        SELECT 
            SUM(v.TotalPesos) AS TotalMonto,
            COUNT(vd.Cantidad) AS TotalCantidad
        FROM 
            Venta v
        JOIN 
            VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
        WHERE 
            v.Fecha >= DATEADD(DAY, -30, GETDATE());
    `;
    return await executeQuery(query);
};

// 2. Venta con el monto más alto
export const highestSale = async () => {
    const query = `
        SELECT 
            Fecha, 
            TotalPesos 
        FROM 
            Venta 
        ORDER BY 
            TotalPesos DESC 
        OFFSET 0 ROWS 
        FETCH NEXT 1 ROWS ONLY;
    `;
    return await executeQuery(query);
};

// 3. Producto con mayor monto total de ventas
export const topProductSales = async () => {
    const query = `
        SELECT 
            p.Nombre, 
            SUM(vd.TotalLinea) AS MontoTotal
        FROM 
            VentaDetalle vd
        JOIN 
            Producto p ON vd.ID_Producto = p.ID_Producto
        GROUP BY 
            p.Nombre
        ORDER BY 
            MontoTotal DESC 
        OFFSET 0 ROWS 
        FETCH NEXT 1 ROWS ONLY;
    `;
    return await executeQuery(query);
};

// 4. Local con mayor monto de ventas
export const topStoreSales = async () => {
    const query = `
        SELECT 
            l.Nombre, 
            SUM(v.TotalPesos) AS MontoTotal
        FROM 
            Venta v
        JOIN 
            Local l ON v.ID_Local = l.ID_Local
        GROUP BY 
            l.Nombre
        ORDER BY 
            MontoTotal DESC 
        OFFSET 0 ROWS 
        FETCH NEXT 1 ROWS ONLY;
    `;
    return await executeQuery(query);
};

// 5. Marca con mayor margen de ganancias
export const topBrandMargin = async () => {
    const query = `
        SELECT 
            m.Nombre, 
            SUM((vd.Cantidad * vd.Precio_Unitario) - (vd.Cantidad * p.Costo)) AS MargenGanancias
        FROM 
            VentaDetalle vd
        JOIN 
            Producto p ON vd.ID_Producto = p.ID_Producto
        JOIN 
            Marca m ON p.ID_Marca = m.ID_Marca
        GROUP BY 
            m.Nombre
        ORDER BY 
            MargenGanancias DESC 
        OFFSET 0 ROWS 
        FETCH NEXT 1 ROWS ONLY;
    `;
    return await executeQuery(query);
};

// 6. Producto que más se vende en cada local
export const mostSoldByStore = async () => {
    const query = `
        SELECT 
            l.Nombre AS LocalNombre, 
            p.Nombre AS ProductoNombre, 
            SUM(vd.Cantidad) AS TotalVendida
        FROM 
            VentaDetalle vd
        JOIN 
            Venta v ON vd.ID_Venta = v.ID_Venta
        JOIN 
            Local l ON v.ID_Local = l.ID_Local
        JOIN 
            Producto p ON vd.ID_Producto = p.ID_Producto
        GROUP BY 
            l.Nombre, p.Nombre
        ORDER BY 
            l.Nombre, TotalVendida DESC;
    `;
    return await executeQuery(query);
};
