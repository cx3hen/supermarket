import { useEffect } from 'react';
import { getMenu } from '../../service';
const User = () => {
  useEffect(() => {
    getMenu();
  }, []);
  return <div>user</div>;
};

export default User;
