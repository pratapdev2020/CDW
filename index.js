import { YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation'

import { AppRegistry } from 'react-native';
import SplashScreen1 from './screens/SplashScreen1';
import { createStackNavigator } from 'react-navigation-stack';
import { name as appName } from './app.json';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Encountered an error loading page', 'Possible Unhaandled Promise Rejection']);
console.ignoredYellowBox = ['Warning: BackAndroid']
AppRegistry.registerComponent(appName, () => StackNaviApp);
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProjDetailScreen from './screens/ProjDetailScreen';
import ProjCatScreen from './screens/ProjCatScreen';
import ProjCatImagesScreen from './screens/ProjCatImagesScreen';

const StackNaviApp = createAppContainer(createStackNavigator({


    SplashScreen1: { screen: SplashScreen1 },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    NewPasswordScreen: { screen: NewPasswordScreen },
    DashboardScreen: { screen: DashboardScreen },
    ProjDetailScreen: { screen: ProjDetailScreen },
    ProjCatScreen: { screen: ProjCatScreen },
    ProjCatImagesScreen: { screen: ProjCatImagesScreen },



},
    {
        headerMode: 'none',
        transitionConfig: () => ({
            transitionSpec: {
                duration: .1,
            },
        }),
    }));


export default StackNaviApp;
