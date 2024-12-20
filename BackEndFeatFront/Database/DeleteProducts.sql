USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[DeleteProducts]    Script Date: 11/29/2024 9:51:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[DeleteProducts]
    @ProductIds IntList READONLY
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET isDeleted = 1
    WHERE id IN (SELECT Value FROM @ProductIds);
END;
