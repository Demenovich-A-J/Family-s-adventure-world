IF NOT EXISTS ( SELECT  *
				FROM    sys.objects
				WHERE   object_id = OBJECT_ID(N'InsertOrUpdateUserType')
						AND type IN ( N'P', N'PC' ) ) 
begin
	exec('
			create proc InsertOrUpdateUserType
				@Name nvarchar(100),
				@UserTypeId uniqueidentifier = null
			as
			begin
				if(@UserTypeId is null)
				begin
					insert into [dbo].[UserType] (Name) 
						values(@Name)
				end
				else
				begin
					update [dbo].[UserType] set Name = @Name
						where UserTypeId = @UserTypeId
				end
			end
	')
end
