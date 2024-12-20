USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[InsertCategory]    Script Date: 11/29/2024 9:52:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:    Name
-- Create date: 
-- Description: Inserts a new Category record
-- =============================================
ALTER PROCEDURE [dbo].[InsertCategory]
    @ParentId INT = NULL, 
    @CategoryOrder INT = NULL, 
    @Name NVARCHAR(50),   
    @Description NVARCHAR(400),   
    @IsDeleted BIT = 0,
    @CreateDate DATETIME = NULL,
    @UpdateDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if @CreateDate is null, set it to the current date
    IF @CreateDate IS NULL
        SET @CreateDate = GETDATE();

    -- Check if @UpdateDate is null, set it to the current date
    IF @UpdateDate IS NULL
        SET @UpdateDate = GETDATE();

    -- Insert the category into the Categories table
    INSERT INTO Categories
        (ParentId, Name, Description,CategoryOrder, IsDeleted, CreateDate, UpdateDate)
    VALUES
        (@ParentId, @Name, @Description,@CategoryOrder, @IsDeleted, @CreateDate, @UpdateDate);

    -- Return the inserted record
    SELECT * FROM Categories WHERE Id = SCOPE_IDENTITY();
END
