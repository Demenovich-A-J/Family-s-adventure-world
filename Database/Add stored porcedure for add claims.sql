IF NOT EXISTS ( SELECT  *
				FROM    sys.objects
				WHERE   object_id = OBJECT_ID(N'InsertOrUpdateClaim')
						AND type IN ( N'P', N'PC' ) ) 
begin
	exec('
		create proc InsertOrUpdateClaim
			@Name nvarchar(255),
			@Description nvarchar(255),
			@ClaimId uniqueidentifier = null
		as
		begin
			if(@ClaimId is null)
			begin
				insert into [dbo].[Claim] (Name, Description) 
					values(@Name, @Description)
			end
			else
			begin
				update [dbo].[Claim] set Name = @Name, Description = @Description
					where ClaimId = @ClaimId
			end
		end
	')
end