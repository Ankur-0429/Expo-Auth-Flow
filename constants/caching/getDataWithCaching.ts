import AsyncStorage from '@react-native-async-storage/async-storage';

const storeInteractionTimestamp = async (uid: string): Promise<void> => {
  try {
    const timestamp = Date.now();
    await AsyncStorage.setItem(
      `interactionTimestamp_${uid}`,
      timestamp.toString(),
    );
  } catch (error) {
    console.error('Error during storage:', error);
  }
};

const getDataWithCaching = async <T>(
  uid: string,
  fetchFreshDataCallback: (uid: string) => Promise<T>,
  CACHE_EXPIRATION_MS: number = 24 * 60 * 60 * 1000,
): Promise<T> => {
  try {
    const timestamp = await AsyncStorage.getItem(`interactionTimestamp_${uid}`);

    if (
      !timestamp ||
      Date.now() - parseInt(timestamp, 10) > CACHE_EXPIRATION_MS
    ) {
      const freshData = await fetchFreshDataCallback(uid);
      await storeInteractionTimestamp(uid);
      return freshData;
    }

    const cachedData = await AsyncStorage.getItem(`cachedData_${uid}`);
    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }

    const freshData = await fetchFreshDataCallback(uid);
    return freshData;
  } catch (error) {
    console.error('Error during grabbing data:', error);
    const freshData = await fetchFreshDataCallback(uid);
    return freshData;
  }
};

export default getDataWithCaching;
