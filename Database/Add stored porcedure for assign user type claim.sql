IF NOT EXISTS ( SELECT  *
				FROM    sys.objects
				WHERE   object_id = OBJECT_ID(N'AssignUserTypeClaim')
						AND type IN ( N'P', N'PC' ) ) 
begin
	exec('
		create proc AssignUserTypeClaim
			@UserTypeId uniqueidentifier,
			@ClaimId uniqueidentifier
		as
		begin
			if not exists(select top 1 * from [dbo].[UserTypeClaim] where ClaimId = @ClaimId and UserTypeId = @UserTypeId)
			begin
				insert into [dbo].[UserTypeClaim] (UserTypeId, ClaimId) 
					values(@UserTypeId, @ClaimId)
			end
		end
	')
end