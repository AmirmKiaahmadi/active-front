import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OnSiteLayout() {
	const { pathname } = useLocation();
	return (
		<>
			<div className="sm:w-full md:px-[35%] md:bg-bg-md-screen">
				<div className=" bg-white">
					<motion.div
						key={pathname}
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '-100%' }}
						transition={{ duration: 0.2 }}
						className="grow"
					>
						<Outlet />
					</motion.div>
				</div>
			</div>
		</>
	);
}
