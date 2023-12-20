-- copy this file for each table
CREATE TRIGGER update_user_updated_at_before_update
BEFORE UPDATE ON users --  <- and change table name
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();