USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetProductsWithDetails]    Script Date: 11/29/2024 9:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetProductsWithDetails]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN

    DECLARE @StartRow INT = (@PageNumber - 1) * @PageSize;

 
    WITH ProductPage AS (
        SELECT 
            p.Id AS ProductId
        FROM 
            Products p
        WHERE 
            p.IsDeleted = 0
        ORDER BY 
            p.Id
        OFFSET @StartRow ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
   
    SELECT 
        p.Id AS ProductId,
        p.Name,
        p.Description,
        p.Price,
        p.Stock,
        c.Name AS CategoryName,
		c.Id AS CategoryId,
        p.CreateDate,
        p.UpdateDate,
        g.Id AS GalleryId,
        g.Name AS GalleryUrl,
        g.IsMain,
		  g.IsDeleted as GalleryIsDeleted
    FROM 
        Products p
    INNER JOIN 
        ProductPage pp ON p.Id = pp.ProductId
    LEFT JOIN 
        Categories c ON p.CategoryId = c.Id
    LEFT JOIN 
       Galleries g ON g.ProductId = p.Id where g.IsDeleted=0
    ORDER BY 
        p.Id, g.Id;

   
    SELECT COUNT(*) AS TotalCount FROM Products p WHERE p.IsDeleted = 0;
END;
