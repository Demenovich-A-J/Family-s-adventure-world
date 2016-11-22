IF NOT EXISTS ( SELECT  *
				FROM    sys.objects
				WHERE   object_id = OBJECT_ID(N'InsertOrUpdateSetting')
						AND type IN ( N'P', N'PC' ) ) 
begin
	exec('
		create proc InsertOrUpdateSetting
			@Name nvarchar(100),
			@Value nvarchar(100),
			@SettingId uniqueidentifier = null
		as
		begin
			if(@SettingId is null)
			begin
				insert into [dbo].[Setting] (Name, Value) 
					values(@Name, @Value)
			end
			else
			begin
				update [dbo].[Setting] set Name = @Name, Value = @Value
					where SettingId = @SettingId
			end
		end
	')
end