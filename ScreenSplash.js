import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Tajawal_900Black } from "@expo-google-fonts/tajawal";


const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({Tajawal_900Black});
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
        await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView>
                <Text style={styles.brand}>My App</Text>
        </SafeAreaView>
    );
}
