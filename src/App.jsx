import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Admin/Dashboard';
import ManajemenKaryawan from './Admin/ManajemenKaryawan';
import LaporanInspeksi from './Admin/LaporanInspeksi';
import SuratMenyurat from './Admin/SuratMenyurat';
import DataMoU from './Admin/DataMoU';
import Customer from './Admin/Customer';
import StokBarang from './Admin/StokBarang';
import AdminProfile from './Admin/AdminProfile';
import DetailInspeksi from './Admin/DetailInspeksi';
import TipeBarang from './Admin/TipeBarang';
import LihatKaryawan from './Admin/LihatKaryawan';
import SuratTipe from './Admin/SuratTipe';
import DetailCustomer from './Admin/DetailCustomer';
import ManajemenInspeksi from './Karyawan/ManajemenInspeksi';
import FormInspeksi from './Karyawan/FormInspeksi';
import LaporanInspeksiKaryawan from './Karyawan/LaporanInspeksiKaryawan';
import DetailInspeksiKaryawan from './Karyawan/DetailInspeksiKaryawan';
import PengajuanSurat from './Karyawan/PengajuanSurat';
import TambahPengajuanSurat from './Karyawan/TambahPengajuanSurat';
import EditPengajuanSurat from './Karyawan/EditPengajuanSurat';
import KaryawanProfile from './Karyawan/ProfileKaryawan';
import Inspeksi from './ManagerOperasional/Inspeksi';
import TambahInspeksi from './ManagerOperasional/TambahInspeksi';
import EditInspeksi from './ManagerOperasional/EditInspeksi';
import LihatInspeksi from './ManagerOperasional/LihatInspeksi';
import ManagerProfile from './ManagerOperasional/ProfileManager';
import ProtectedRoute from './auth/ProtectedRoute';
import LaporInspeksiKaryawan from './ManagerOperasional/LaporanInspeksiKaryawan';
import DetailInspekKaryawan from './ManagerOperasional/DetailInspeksiKaryawan';
import Forbidden from './Components/forbidden';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/unauthorized' element={<Forbidden />} />
                <Route path='/' element={<Login />} />
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/manajemenkaryawan'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManajemenKaryawan />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/laporaninspeksi'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <LaporanInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/suratmenyurat'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <SuratMenyurat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/datamou'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <DataMoU />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/customer'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Customer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/stokbarang'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <StokBarang />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/adminprofile'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/detailinspeksi/:id'
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'operasional']}>
                            <DetailInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/tipebarang'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <TipeBarang />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/lihatkaryawan/:id'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <LihatKaryawan />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/surattipe'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <SuratTipe />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/detailcustomer/:idCustomer'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <DetailCustomer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/manajemeninspeksi'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <ManajemenInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/forminspeksi/:id'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <FormInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/laporaninspeksikaryawan'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <LaporanInspeksiKaryawan />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/detailinspeksikaryawan/:id'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <DetailInspeksiKaryawan />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/pengajuansurat'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <PengajuanSurat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/tambahpengajuansurat'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <TambahPengajuanSurat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/editpengajuansurat/:id'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <EditPengajuanSurat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/karyawanprofile'
                    element={
                        <ProtectedRoute allowedRoles={['karyawan']}>
                            <KaryawanProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/inspeksi'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <Inspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/tambahinspeksi'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <TambahInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/editinspeksi/:id'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <EditInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/lihatinspeksi/:id'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <LihatInspeksi />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/managerprofile'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <ManagerProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/laporinspeksikaryawan'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <LaporInspeksiKaryawan />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/detailinspekkaryawan/:id'
                    element={
                        <ProtectedRoute allowedRoles={['operasional']}>
                            <DetailInspekKaryawan />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
