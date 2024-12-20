ALTER PROCEDURE [dbo].[UpdateUserAndCustomer]
    @UserId INT,
    @UserName NVARCHAR(50),
    @FullName NVARCHAR(100),
    @Email NVARCHAR(255),
    @Phone NVARCHAR(20),
    @Address NVARCHAR(MAX),
    @PasswordHash NVARCHAR(MAX) = NULL,
    @PasswordSalt NVARCHAR(MAX) = NULL,
    @RoleId INT
AS
BEGIN
    
    BEGIN TRANSACTION;
    BEGIN TRY
      
        UPDATE dbo.Users
        SET Username = @UserName,
            PasswordHash = CASE WHEN @PasswordHash IS NOT NULL THEN @PasswordHash ELSE PasswordHash END,
            PasswordSalt = CASE WHEN @PasswordSalt IS NOT NULL THEN @PasswordSalt ELSE PasswordSalt END,
            UpdateDate = GETDATE()
        WHERE UserId = @UserId;

    
        UPDATE dbo.Customers
        SET FullName = @FullName,
            Email = @Email,
            Phone = @Phone,
            Address = @Address,
            UpdateDate = GETDATE()
        WHERE UserId = @UserId;

    
        IF EXISTS (SELECT 1 FROM dbo.UserRoles WHERE UserId = @UserId)
        BEGIN
            UPDATE dbo.UserRoles
            SET RoleId = @RoleId
            WHERE UserId = @UserId;
        END
        ELSE
        BEGIN
            INSERT INTO dbo.UserRoles (UserId, RoleId)
            VALUES (@UserId, @RoleId);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
