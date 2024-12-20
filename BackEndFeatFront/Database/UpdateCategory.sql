USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 11/29/2024 9:53:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateCategory]
    @CategoryId INT, 
    @Name NVARCHAR(50), 
    @Description NVARCHAR(400), 
    @IsDeleted BIT = 0,  
    @UpdateDate DATETIME = NULL  
AS
BEGIN
    
    IF @CategoryId IS NULL OR @CategoryId = 0
    BEGIN
        RAISERROR('CategoryId is required.', 16, 1);
        RETURN;
    END

  
    IF @UpdateDate IS NULL
        SET @UpdateDate = GETDATE();

  
    UPDATE Categories
    SET 
        Name = @Name,
        Description = @Description,
        IsDeleted = @IsDeleted,
        UpdateDate = @UpdateDate
    WHERE Id = @CategoryId;


    SELECT * FROM Categories WHERE Id = @CategoryId;
END