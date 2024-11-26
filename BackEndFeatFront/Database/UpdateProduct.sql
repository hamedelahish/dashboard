USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 11/16/2024 8:15:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateProduct]
    @ProductId INT,
    @CategoryId INT,
    @Name NVARCHAR(50),
    @Description NVARCHAR(500),
    @Price BIGINT,
    @Stock INT
 
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET 
        CategoryId = COALESCE(@CategoryId,CategoryId),
        Name = COALESCE(@Name,Name),
        Description = COALESCE(@Description,Description),
        Price =COALESCE(@Price,Price),
        Stock =COALESCE( @Stock,Stock)
    WHERE Id = @ProductId;
END;
