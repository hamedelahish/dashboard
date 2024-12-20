USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetCategories]    Script Date: 11/29/2024 9:51:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetCategories]
AS
BEGIN
    SELECT 
        c1.Id,
        c1.Name,
	    c1.Description,
        c1.ParentId,
		c1.CategoryOrder,
        COUNT(p.Id) AS ProductCount
    FROM 
        Categories c1
    LEFT JOIN 
        Products p ON c1.Id = p.CategoryId
        WHERE c1.IsDeleted=0
    GROUP BY 
        c1.Id, c1.Name, c1.ParentId,c1.CategoryOrder,c1.Description
    ORDER BY 
        CategoryOrder,c1.ParentId, c1.Id
END;