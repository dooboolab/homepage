package com.dooboolab.app;

import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    static String currentLocale;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        int nightModeFlags =
            getApplicationContext().getResources().getConfiguration().uiMode &
                    Configuration.UI_MODE_NIGHT_MASK;

        switch (nightModeFlags) {
            case Configuration.UI_MODE_NIGHT_YES:
                getWindow().getDecorView().setBackgroundColor(Color.parseColor("#222222"));
                break;

            case Configuration.UI_MODE_NIGHT_NO:
            case Configuration.UI_MODE_NIGHT_UNDEFINED:
                getWindow().getDecorView().setBackgroundColor(Color.WHITE);
                break;
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dooboolab";
    }

    public static class MainActivityDelegate extends ReactActivityDelegate {
        public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
            super(activity, mainComponentName);
        }
        @Override
        protected ReactRootView createRootView() {
            ReactRootView reactRootView = new RNGestureHandlerEnabledRootView(getContext());
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
            return reactRootView;
        }

        @Override
            protected boolean isConcurrentRootEnabled() {
            // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
            // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        String locale = newConfig.locale.toString();
        if (!locale.equals(MainActivity.currentLocale)) {
            MainActivity.currentLocale = locale;
            final ReactInstanceManager instanceManager = getReactInstanceManager();
            instanceManager.recreateReactContextInBackground();
        }
    }
}
