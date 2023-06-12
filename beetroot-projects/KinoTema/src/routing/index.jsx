import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Serial from '../pages/Serial';
import Film from '../pages/Film';
import Films from '../pages/Films';
import routes from './routes';
import Layout from '../components/Layout';
import Serials from '../pages/Serials';
import { NotFound } from '../pages/NotFound';

 const Routing = () => {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path={routes.films} element={<Films />} />
					<Route path={`${routes.films}/:filmId`} element={<Film />} />
					<Route path={routes.serials} element={<Serials />} />
					<Route path={`${routes.serials}/:serialId`} element={<Serial />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
export default Routing