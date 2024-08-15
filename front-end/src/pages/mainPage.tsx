import { useState, useEffect } from "react";
import { fetchCurrentUser, logout } from "@/lib/api";
import { Link } from "react-router-dom";
import { User } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { apiBaseUrl } from "@/lib/api";

function AgricultureEcommerce() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	const handleLogout = async () => {
		await logout();
		setUser(null); // Update state to reflect the user is logged out
	};

	return (
		<div className='min-h-screen'>
			{/* Navbar */}
			<nav className='bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50'>
				<div className='text-2xl font-bold'>
					<img
						src='../images/logoharvest.png'
						alt='HarvestHub Logo'
						className='h-10 w-auto'
					/>
				</div>

				<div className='flex items-center space-x-4'>
					<div className='relative w-[400px]'>
						<input
							type='text'
							placeholder='Search'
							className='border border-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none'
						/>
						<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon icon={faSearch} className='text-gray-500' />
						</div>
					</div>
				</div>

				<div className='space-x-4'>
					<Link to='/companyprofile'>
						<button className='text-gray-700 border border-gray-300 rounded px-4 py-2 hover:text-blue-500 hover:shadow-md transition-shadow duration-300'>
							Tentang HarvestHub
						</button>
					</Link>
				</div>
				{user ? (
					<>
						<p className='font-semibold'>Selamat datang {user.name}!</p>
						<Avatar>
							<AvatarImage
								src={`${apiBaseUrl}/uploads/${user.profile_picture_url}`}
							/>
							<AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					</>
				) : (
					<></>
				)}
				<div className='space-x-4'>
					{user ? (
						<>
							{user.role === "seller" && (
								<Link to='/sellerpage'>
									<button className='bg-blue-500 text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
										Seller Page
									</button>
								</Link>
							)}
							{user.role === "buyer" && (
								<Link to='#'>
									<button className='bg-blue-500 text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
										Buyer Page
									</button>
								</Link>
							)}
							<button
								onClick={handleLogout}
								className='bg-gray-200 px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'
							>
								Keluar
							</button>
							{/* You might want to display user info or other options here */}
						</>
					) : (
						<>
							<Link to='/signin'>
								<button className='bg-gray-200 px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
									Masuk
								</button>
							</Link>
							<Link to='/signup'>
								<button className='bg-black text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
									Daftar
								</button>
							</Link>
						</>
					)}
				</div>
			</nav>

			{/* Hero Section */}
			<header
				className='w-full min-h-screen flex items-center justify-center bg-cover bg-center'
				style={{
					backgroundImage: `url('../images/Background.jpg')`,
				}}
			>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-black mb-2 -mt-2'>
						Produk Terbaik, Terpercaya, Langsung dari Petani Lokal!
					</h1>
					<div className='mt-4'>
						<button className='bg-black text-white px-4 py-2 rounded mr-2 mb-20 hover:shadow-lg transition-shadow duration-300'>
							Promo
						</button>
						<button className='bg-gray-300 px-4 py-2 rounded mb-40 hover:shadow-lg transition-shadow duration-300'>
							Produk Baru
						</button>
					</div>
				</div>
			</header>

			{/* Categories */}
			<section className='py-12'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-4 gap-4'>
						<div className='text-center relative hover:shadow-lg transition-shadow duration-300'>
							<img
								src='../images/All Category.jpeg'
								alt='All Category'
								className='w-full rounded'
							/>
							<Link to='/productpagetest'></Link>
							<h3 className='mt-4 text-lg font-semibold'>Semua Kategori</h3>
						</div>
						<div className='text-center relative hover:shadow-lg transition-shadow duration-300'>
							<img
								src='../images/Vegetables.jpeg'
								alt='Vegetables'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>TEST</h3>
						</div>
						<div className='text-center relative hover:shadow-lg transition-shadow duration-300'>
							<img
								src='../images/Fruits.jpeg'
								alt='Fruits'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>Buah</h3>
						</div>
						<div className='text-center relative hover:shadow-lg transition-shadow duration-300'>
							<img
								src='../images/Bundling Package.jpeg'
								alt='Bundling Package'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>Bundling Package</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Today's Offers */}
			<div className='container mx-auto p-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Penawaran Hari Ini</h1>
					<button className='text-blue-500'>View All</button>
				</div>
				<div className='grid grid-cols-5 gap-4'>
					{/* Product Item */}
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Telur Asin Brebes.jpg'
							alt='Telur Asin Brebes'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 11%</h3>
						<p className='text-gray-600'>Rp 7.500</p>
						<p className='text-gray-400 text-sm'>Telur Asin Brebes</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Apel Malang.jpeg'
							alt='Apel Malang'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 7%</h3>
						<p className='text-gray-600'>Rp 14.300</p>
						<p className='text-gray-400 text-sm'>Apel Malang</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Daging Ayam.jpeg'
							alt='Daging Ayam'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 10%</h3>
						<p className='text-gray-600'>Rp 26.500</p>
						<p className='text-gray-400 text-sm'>Daging Ayam</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Nanas Pemalang.jpg'
							alt='Nanas Pemalang'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 15%</h3>
						<p className='text-gray-600'>Rp 17.800</p>
						<p className='text-gray-400 text-sm'>Nanas Pemalang</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Kacang Mede.jpg'
							alt='Kacang Mede'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Discount 20%</h3>
						<p className='text-gray-600'>Rp 65.000</p>
						<p className='text-gray-400 text-sm'>Kacang Mede</p>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className='container mx-auto p-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Paling Laris</h1>
					<button className='text-blue-500'>View All</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{/* Product Card */}
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Beras Merah.jpg'
							alt='Beras Merah Cianjur'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 13.000</div>
						<div className='text-gray-600'>Beras Merah Cianjur</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Pepaya California.jpg'
							alt='Pepaya California'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 12.000</div>
						<div className='text-gray-600'>Pepaya California</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Anggur.jpg'
							alt='Anggur'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 10.500</div>
						<div className='text-gray-600'>Anggur</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Alpukat Mentega.jpg'
							alt='Alpukat Mentega'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 25.000</div>
						<div className='text-gray-600'>Alpukat Mentega</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/Pisang Sunpride.jpg'
							alt='Pisang Sunpride'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 10.000</div>
						<div className='text-gray-600'>Pisang Sunpride</div>
					</div>
				</div>

				{/* Farmer Profile */}
				<div className='bg-white p-8 rounded shadow mt-8'>
					<div className='flex flex-col md:flex-row items-center'>
						<img
							src='../images/Budi Santoso.jpg'
							alt='Budi Santoso'
							className='w-48 h-48 object-cover rounded-full md:mr-8'
						/>
						<div>
							<h2 className='text-xl font-bold mb-2'>Profil Petani</h2>
							<div className='text-gray-700'>
								<p>
									<strong>Nama:</strong> Budi Santoso
								</p>
								<p>
									<strong>Usia:</strong> 45 Tahun
								</p>
								<p>
									<strong>Lokasi:</strong> Desa Sumber Agung, Kabupaten Jember
								</p>
								<p className='mt-4'>
									Saya Budi Santoso, seorang petani yang telah menggeluti dunia
									pertanian sejak usia muda. Berasal dari keluarga petani, saya
									meneruskan tradisi ini dengan penuh dedikasi. Di lahan seluas
									2 hektar, saya mengelola berbagai jenis tanaman seperti padi,
									jagung, dan sayuran. Dengan pengalaman lebih dari 20 tahun,
									saya menguasai teknik bercocok tanam yang efisien dan ramah
									lingkungan. Saya juga aktif dalam penerapan teknologi
									pertanian terbaru untuk meningkatkan hasil panen dan kualitas
									produk.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
		</div>
	);
}

export default AgricultureEcommerce;
