-- Optional catalog seed. Run after schema.sql. No demo users or credentials are created.
insert into public.achievements(code,name,description,xp_reward) values
('FIRST_QUEST','FIRST QUEST','Complete your first approved quest.',50),
('QUEST_MASTER','QUEST MASTER','Issue 10 quests.',50),
('POLITY_SURVIVOR','POLITY SURVIVOR','Complete 10 Polity quests.',50),
('NIGHT_OWL','NIGHT OWL','Complete a quest after midnight.',50),
('STUDY_PARTNER','STUDY PARTNER','Complete a quest issued by a friend.',50),
('SYSTEM_FAVOURITE','SYSTEM FAVOURITE','Complete 10 System Quests.',50),
('LEVEL_10','LEVEL 10','Reach Level 10.',50),
('FRIENDSHIP_LINK','FRIENDSHIP LINK','Accept your first friend request.',50)
on conflict(code) do nothing;

-- Promote a specific already-created account manually, once (run in SQL Editor):
-- begin; select set_config('duo.trusted_write','on',true); update public.profiles set role='admin' where username='your_admin_username'; commit;
