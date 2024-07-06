import { Admin, ListGuesser, Resource} from 'react-admin';
import { prepostDataProvider } from './services/prepost-dataprovider';
import { prepostAuthProvider } from './services/auth-provider';


const prepostURL = import.meta.env.VITE_PREPOST_URL;
const mainDataProvider = prepostDataProvider(prepostURL);
const authProvider = new prepostAuthProvider(prepostURL);

export const App = () => (
    <Admin dataProvider={mainDataProvider} authProvider={authProvider}>
        <Resource name='posts' list={ListGuesser} />        
        <Resource name='users' list={ListGuesser} />        
    </Admin>
);

    