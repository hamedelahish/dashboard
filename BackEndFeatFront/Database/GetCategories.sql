USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetCategories]    Script Date: 11/16/2024 8:12:39 AM ******/
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
        c1.ParentId
    FROM 
        Categories c1
    ORDER BY 
        c1.ParentId, c1.id
END;
