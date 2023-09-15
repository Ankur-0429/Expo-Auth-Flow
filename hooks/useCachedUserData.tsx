import {useEffect, useState} from 'react';

import getDataWithCaching from '../constants/caching/getDataWithCaching';
import getUserData from '../constants/getDataFromDB/getUserData';
import userType from '../constants/types/userType';

const useCachedUserData = ({uid}: {uid: string}) => {
  const [user, setUser] = useState(null as userType | null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getDataWithCaching(uid, async () => {
        const data = await getUserData(uid);
        if (data) {
          return data;
        }
      });

      if (data) {
        setUser(data);
      }
      setIsLoading(false);
    };

    getData();
  }, [uid]);

  return {
    user,
    isLoading,
  };
};

export default useCachedUserData;
