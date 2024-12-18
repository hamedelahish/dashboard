USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetProductsWithFilter]    Script Date: 11/29/2024 9:52:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetProductsWithFilter]
    @Name NVARCHAR(50) = NULL,
    @CategoryID INT = NULL,
    @PriceFrom DECIMAL(18, 2) = NULL,
    @PriceTo DECIMAL(18, 2) = NULL,
    @Stock INT = NULL
AS
BEGIN

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
    LEFT JOIN 
        Categories c ON p.CategoryId = c.Id
    LEFT JOIN 
        Galleries g ON g.ProductId = p.Id  
    WHERE 

        p.IsDeleted = 0
		AND g.IsDeleted=0
        AND (@Name IS NULL OR p.Name LIKE '%' + @Name + '%')
        AND (@CategoryID IS NULL OR p.CategoryId = @CategoryID)
        AND (@PriceFrom IS NULL OR p.Price >= @PriceFrom)
        AND (@PriceTo IS NULL OR p.Price <= @PriceTo)
        AND (@Stock IS NULL OR p.Stock = @Stock)
    ORDER BY 
        p.Id DESC, g.Id;

    SELECT COUNT(*) AS TotalCount 
    FROM Products p 
    WHERE p.IsDeleted = 0
    AND (@Name IS NULL OR p.Name LIKE '%' + @Name + '%')
    AND (@CategoryID IS NULL OR p.CategoryId = @CategoryID)
    AND (@PriceFrom IS NULL OR p.Price >= @PriceFrom)
    AND (@PriceTo IS NULL OR p.Price <= @PriceTo)
    AND (@Stock IS NULL OR p.Stock = @Stock);
END;
