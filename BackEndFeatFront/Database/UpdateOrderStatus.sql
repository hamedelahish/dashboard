USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderStatus]    Script Date: 12/3/2024 10:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateOrderStatus]
    @OrderId INT,
    @StatusId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Orders
    SET StatusId = @StatusId,
        UpdateDate = GETDATE()
    WHERE OrderId = @OrderId;
END
