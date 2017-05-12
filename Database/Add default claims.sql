if not exists(select top 1 * from Claim where Name = 'View')
begin
	exec InsertOrUpdateClaim 'Admin', 'This claim allows to view default content'
end

if not exists(select top 1 * from Claim where Name = 'Manage Family')
begin
	exec InsertOrUpdateClaim 'Manage Family', 'This claim allows to create/edit family'
end

if not exists(select top 1 * from Claim where Name = 'Assign Quests')
begin
	exec InsertOrUpdateClaim 'Assign Quests', 'This claim allows to assign quests to family members'
end

if not exists(select top 1 * from Claim where Name = 'Manage Achivments')
begin
	exec InsertOrUpdateClaim 'Manage Achivments', 'This claim allows to manage achivments'
end

if not exists(select top 1 * from Claim where Name = 'Manage Family Quests')
begin
	exec InsertOrUpdateClaim 'Manage Family Quests', 'This claim allows to manage family quests'
end

if not exists(select top 1 * from Claim where Name = 'Manage Member Quests')
begin
	exec InsertOrUpdateClaim 'Manage Member Quests', 'This claim allows to change status of family member quests to proccess them futher'
end
