if not exists(select top 1 * from UserType where Name = 'Admin')
begin
	exec InsertOrUpdateUserType 'Admin'
end

if not exists(select top 1 * from UserType where Name = 'Dad')
begin
	exec InsertOrUpdateUserType 'Dad'
end

if not exists(select top 1 * from UserType where Name = 'Mom')
begin
	exec InsertOrUpdateUserType 'Mom'
end

if not exists(select top 1 * from UserType where Name = 'Son')
begin
	exec InsertOrUpdateUserType 'Son'
end

if not exists(select top 1 * from UserType where Name = 'Daughter')
begin
	exec InsertOrUpdateUserType 'Daughter'
end