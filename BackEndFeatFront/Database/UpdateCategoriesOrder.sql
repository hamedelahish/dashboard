USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategoriesOrder]    Script Date: 11/29/2024 9:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateCategoriesOrder]
    @Categories UpdateCategoryOrderTableType READONLY
AS
BEGIN
    UPDATE Categories
    SET ParentId = c.ParentId,
        CategoryOrder = c.CategoryOrder,
        UpdateDate = GETDATE()
    FROM Categories cat
    INNER JOIN @Categories c ON cat.Id = c.Id;
END
