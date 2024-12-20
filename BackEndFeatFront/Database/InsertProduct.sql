USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[InsertProduct]    Script Date: 11/29/2024 9:53:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:    Name
-- Create date: 
-- Description:  
-- =============================================
ALTER PROCEDURE [dbo].[InsertProduct] 
      @CategoryId int = 0, 
      @Name nvarchar(50),   
      @Description nvarchar(400),   
      @Price bigint,
      @Stock int,
      @IsDeleted bit = 0,
      @CreateDate datetime = null,
      @UpdateDate datetime = null
AS
BEGIN
    -- Check if @CreateDate is null, set it to the current date
    IF @CreateDate IS NULL
        SET @CreateDate = GETDATE();

    -- Check if @UpdateDate is null, set it to the current date
    IF @UpdateDate IS NULL
        SET @UpdateDate = GETDATE();

    -- Insert the product into the Products table
    INSERT INTO Products
        (CategoryId, Name, Description, Price, Stock, IsDeleted, CreateDate, UpdateDate)
    VALUES
        (@CategoryId, @Name, @Description, @Price, @Stock, @IsDeleted, @CreateDate, @UpdateDate);

    select * from Products where id =  SCOPE_IDENTITY()
END