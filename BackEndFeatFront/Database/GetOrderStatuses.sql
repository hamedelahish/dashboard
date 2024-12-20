USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderStatuses]    Script Date: 12/14/2024 11:26:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetOrderStatuses]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        StatusId,
        StatusName,
        IsDeleted,
        CreateDate,
        UpdateDate
    FROM OrderStatuses
    WHERE IsDeleted = 0
    ORDER BY CreateDate DESC;
END;
