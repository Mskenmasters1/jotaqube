import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../pages/login/LoginPage";
import { PagesLayout } from "../layouts/PagesLayout";
import { CursosPage } from "../pages/cursos/CursosPage";
import { useContext, useEffect, useState } from "react";
import { ILocalStorageInfo } from "../interfaces/localStorageInfo.interface";
import { IUsuarioInfoContext } from "../interfaces/context.interface";
import { AppContext } from "../context/AppContext";

export const AppRouter = () => {
	const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const infoStorage: ILocalStorageInfo = JSON.parse(
			localStorage.getItem("usuarioInfo")!
		);
		if (infoStorage) {
			setUsuarioInfo({
				email: infoStorage.email,
				socket: undefined,
			});
		}
		setLoading(false);
	}, []);

	return (
		<>
			{!loading && (
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<LoginPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Route>

					<Route path="/chat" element={<PagesLayout />}>
						<Route index element={<CursosPage />} />
						<Route path="/codigo/:idCurso/:nombre" element={<CursosPage />} />
					</Route>
				</Routes>
			)}
		</>
	);
};
