// const arr = ['lemon','orange','pineapple','banana'] 
// const size  = arr.length
// console.log(size) 
// // at is used to written the index number in the given string 
// console.log(arr.at([2]))
// // to string method is used to writtent eh list of elements in comma seperated values 
// const result = arr.toString()
// console.log(result) 
// // pop method is  used to remove the elements at the end of the array 
// const arr1 = arr.pop() 
// console.log(arr1)
// // push it is used to add the element in array  
// const arr2 = arr.push('nani')  
// console.log(arr2) 
// console.log(arr)  
// // the shift is used to remove the first element in the given array  
// const arr3 = arr.shift() 
// console.log(arr3)
// // the unshift is used to add the element in the array  
// const arr4 = arr.unshift('fruits') 
// console.log(arr4)
// console.log(arr) 
// // changing the element using index 
// arr[0] = 'kishor'
// console.log(arr) 
// //  deleting the element in the array 
// delete arr[0]
// console.log(arr)import React, { useState, useEffect } from 'react';
// import {
//   PageBody,
//   PageFilters,
//   PageFiltersHead,
//   PageFiltersTail,
//   PageHeader,
//   PageLayout,
//   PageSubHeader,
//   PageSubHeaderHead,
//   PageSubHeaderTail,
// } from '../Layout/PageLayout';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';

// import {
//   DefaultFilter,
//   RefreshFilter,
//   SortFilter,
//   StatusFilter,
//   VisibilityFilter,
// } from '../../components/MynyfyFilters';
// import { MenuItem, Box, Popover } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import commonService from '../../services/common.service';
// import { MobileDatePicker } from '@mui/x-date-pickers';
// import MynyfyText from '../../components/MynyfyText';
// import adminService from '../../services/admin.service';
// import _, { get } from 'lodash';
// import brandService from '../../services/brand.service';
// import productService from '../../services/product.service';
// import productOrderService from '../../services/productOrder.service';
// import orgService from '../../services/org.service';
// import moment from 'moment';
// import dashBoardService from '../../services/dashBoard.service';
// import Avatar from '@mui/material/Avatar';
// import PartnerService from '../../services/partner.service';
// import transactionService from '../../services/transaction.service';
// import IconButton from '@mui/material/IconButton';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import MynyfyWebSelect from '../../components/MynyfySelect';
// import appDataService from '../../services/appData.service';
// import { setNamesList, setSupportNames } from '../../redux/slices/supportNames.slice';
// import { useNavigate } from 'react-router';
// import { AppRoute } from '../../constants/mynyfyRoutes.const';
// import pocketStoreProductService from '../../services/pocketstoreProducts.service';
// import pocketStoreService from '../../services/pocketstore.service';
// import { setDashboardData } from '../../redux/slices/dashboard.slice';

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const namesList = useSelector((state) => state.supportNames.namesList);
//   const profile = useSelector((state) => state.user.user);
//   const selectedName = useSelector((state) => state.supportNames.selectedName);
//   const dashboardData = useSelector((state) => state.dashboard);
//   const [selectedStat, setSelectedStat] = useState(null);
//   const [filter, setFilter] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [customDateRange, setCustomDateRange] = useState({ startDate: '', endDate: '' });
//   const [close, setClose] = useState();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [refresh, setRefresh] = useState({ start: false, stop: false });
//   const [selectedRange, setSelectedRange] = useState('');
//   const [dateRange, setDateRange] = useState('');
//   const [monthAnchorEl, setMonthAnchorEl] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(moment().year());
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const months = moment.months();

//   useEffect(() => {
//     getSupportProfiles();
//   }, []);

//   const handleSupportChange = (selected) => {
//     dispatch(setSupportNames(selected));
//   };

//   //Support Profile
//   const getSupportProfiles = () => {
//     appDataService.categorySort('SupportProfiles').then((res) => {
//       let sorted = _.orderBy(res, ['name'], ['asc']);
//       dispatch(setNamesList(sorted));
//     });
//   };

//   const handleRangeFilter = async (range) => {
//     setSelectedRange(range);

//     let startDate = null;
//     let endDate = null;

//     switch (range) {
//       case 'Today':
//         startDate = moment().startOf('day');
//         endDate = moment().endOf('day');
//         setDateRange('today');
//         break;

//       case 'Week':
//         startDate = moment().subtract(7, 'days').startOf('day');
//         endDate = moment().endOf('day').local();
//         setDateRange('week');
//         break;

//       case 'Month':
//         startDate = moment().subtract(1, 'month').startOf('day');
//         endDate = moment().endOf('day').local();
//         setDateRange('month');
//         break;
//       case 'Year':
//         startDate = moment().startOf('year');
//         endDate = moment().endOf('year');
//         setDateRange('year');
//         break;
//       case 'Custom':
//         if (customDateRange.startDate && customDateRange.endDate) {
//           startDate = moment(customDateRange.startDate).startOf('day').local();
//           endDate = moment(customDateRange.endDate).endOf('day').local();
//           setDateRange('custom');
//         } else {
//           return;
//         }
//         break;
//       case 'All':
//         startDate = null;
//         endDate = null;
//         setDateRange('all');
//         break;
//       default:
//         startDate = null;
//         endDate = null;
//         return;
//     }
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };
//   const handleMonthButtonClick = (event) => {
//     setMonthAnchorEl(event.currentTarget);
//   };

//   const handleMonthSelect = (monthIndex) => {
//     setSelectedMonth(monthIndex);
//     const startDate = moment({ year: selectedYear, month: monthIndex }).startOf('month');
//     const endDate = moment({ year: selectedYear, month: monthIndex }).endOf('month');
//     setStartDate(startDate);
//     setEndDate(endDate);
//     setDateRange('month');
//     setFilter('Month');
//     setMonthAnchorEl(null);
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value));
//   };
//   useEffect(() => {
//     if (
//       _.isEmpty(dashboardData.cardsData) ||
//       !_.isEmpty(startDate) ||
//       !_.isEmpty(endDate) ||
//       selectedRange === 'All'
//     ) {
//       getTopBrands();
//       getTopSeller();
//       getProductOrders();
//       BrandProducts();
//       BrandCount();
//       sellerCount();
//       buyerCount();
//       partnerCount();
//       getOrderRevenue();
//       getLeads();
//       getTotalStoreLeads();
//     }
//   }, [startDate, endDate, dateRange, selectedRange]);

//   const handleCustomDateChange = (start, end) => {
//     setCustomDateRange((prev) => ({
//       startDate: start,
//       endDate: end,
//     }));
//   };

//   const getOrderRevenue = () => {
//     const body = { type: 'totalTransactionsCount' };
//     if (dateRange === 'today' || dateRange === 'custom' || dateRange === 'month') {
//       body.startDate = startDate;
//       body.endDate = endDate;
//     }
//     if (['week', 'year'].includes(dateRange)) {
//       body.dateRangeFilter = dateRange;
//     }
//     transactionService.getTxnsReports(body).then((res) => {
//       if (res) {
//         dispatch(setDashboardData({ section: 'cardsData', value: res.cardsData }));
//       } else {
//         console.log('error');
//       }
//     });
//   };

//   const getProductOrders = () => {
//     const body = {
//       completedOrders: {
//         status: 'COMPLETED',
//       },
//     };
//     if (startDate) {
//       body.completedOrders.fromDate = startDate;
//     }
//     if (endDate) {
//       body.completedOrders.toDate = endDate;
//     }

//     productOrderService.getProductOrderCountNew(body).then((res) => {
//       if (res.success) {
//         dispatch(
//           setDashboardData({
//             section: 'ecommerceCount',
//             key: 'completedOrders',
//             value: res.data.completedOrders,
//           })
//         );
//       } else {
//         console.log('error');
//       }
//     });
//   };

//   const BrandProducts = () => {
//     const body = {
//       status: 'ACTIVE',
//     };
//     if (startDate) {
//       body.startDate = startDate;
//     }
//     if (endDate) {
//       body.endDate = endDate;
//     }
//     productService.getProductCountForAdmin(body).then((res) => {
//       if (res.success) {
//         dispatch(setDashboardData({ section: 'ecommerceCount', key: 'products', value: res.data }));
//       } else {
//         console.log('error');
//       }
//     });
//   };

//   const BrandCount = () => {
//     const body = {
//       status: 'all',
//     };
//     if (startDate) {
//       body.startDate = startDate;
//     }
//     if (endDate) {
//       body.endDate = endDate;
//     }
//     brandService.getBrandCount(body).then((res) => {
//       if (res.success) {
//         dispatch(setDashboardData({ section: 'ecommerceCount', key: 'brands', value: res.count }));
//       } else {
//         console.log('error');
//       }
//     });
//   };
//   const sellerCount = () => {
//     const body = {};
//     if (startDate) {
//       body.startDate = startDate;
//     }
//     if (endDate) {
//       body.endDate = endDate;
//     }
//     orgService.getOrgListCount(body).then((res) => {
//       if (res) {
//         dispatch(
//           setDashboardData({ section: 'ecommerceCount', key: 'resellers', value: res?.data })
//         );
//       } else {
//         console.log('error');
//       }
//     });
//   };
//   const buyerCount = () => {
//     const body = {
//       timeCutoff: Date.now(),
//       pageCount: 1,
//     };
//     if (startDate) {
//       body.startDate = startDate;
//     }
//     if (endDate) {
//       body.endDate = endDate;
//     }
//     adminService.GetAllBuyer(body).then((res) => {
//       if (res) {
//         dispatch(setDashboardData({ section: 'ecommerceCount', key: 'buyers', value: res.count }));
//       } else {
//         console.log('error');
//       }
//     });
//   };
//   const partnerCount = () => {
//     const body = {};
//     if (startDate) {
//       body.startDate = startDate;
//     }
//     if (endDate) {
//       body.endDate = endDate;
//     }
//     PartnerService.partnerList(body).then((res) => {
//       if (res) {
//         dispatch(
//           setDashboardData({
//             section: 'ecommerceCount',
//             key: 'influencers',
//             value: res?.data?.count,
//           })
//         );
//       } else {
//         console.log('error');
//       }
//     });
//   };

//   const getLeads = () => {
//     pocketStoreProductService.getLeads().then((res) => {
//       if (res.success) {
//         dispatch(
//           setDashboardData({ section: 'ecommerceCount', key: 'productsClicks', value: res.data })
//         );
//       }
//     });
//   };

//   const getTotalStoreLeads = () => {
//     pocketStoreService.getTotalStoreLeads().then((res) => {
//       if (res.success) {
//         dispatch(
//           setDashboardData({ section: 'ecommerceCount', key: 'storeClicks', value: res.data })
//         );
//       }
//     });
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const Close = () => {
//     setAnchorEl(null);
//   };

//   const ecommerceCard = [
//     {
//       title: 'Products',
//       type: 'Products',
//       value: dashboardData.ecommerceCount.products ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Orders-Delivered ',
//       type: 'ordersCount',
//       value: dashboardData.ecommerceCount.completedOrders ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Brands ',
//       type: 'brandsCount',
//       value: dashboardData.ecommerceCount.brands ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Resellers ',
//       type: 'resellerCount',
//       value: dashboardData.ecommerceCount.resellers ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Influencers ',
//       type: 'partnerCount',
//       value: dashboardData.ecommerceCount.influencers ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Buyers ',
//       type: 'buyersCount',
//       value: dashboardData.ecommerceCount.buyers ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Products Clicks',
//       type: 'leads',
//       value: dashboardData.ecommerceCount.productsClicks ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Store Clicks',
//       type: 'storeLeads',
//       value: dashboardData.ecommerceCount.storeClicks ?? 0,
//       data: selectedStat,
//     },
//   ];
//   const totalmynyfyRevenue =
//     (dashboardData.cardsData?.totalOrderSubscriptionCommission ?? 0) +
//     (dashboardData.cardsData?.totalSubscriptionCommissions ?? 0) +
//     (dashboardData.cardsData?.totalAdsCommissions ?? 0) +
//     (dashboardData.cardsData?.totalBrandSubscriptionCommissions ?? 0) +
//     (dashboardData.cardsData?.totalPocketStoresRevenue ?? 0);

//   const totalBrandRevenue =
//     (dashboardData.cardsData?.totalBrandRevenue ?? 0) +
//     (dashboardData.cardsData?.totalSellerRevenue ?? 0) +
//     (dashboardData.cardsData?.totalPaymentGatewayCharges ?? 0) +
//     (dashboardData.cardsData?.totalSellerPOS ?? 0);

//   const brandRevenueCards = [
//     {
//       title: 'Total Transactions',
//       type: 'totalRevenue',
//       value: totalBrandRevenue ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Brands Revenue ',
//       type: 'brandsRevenue',
//       value: dashboardData.cardsData?.totalBrandRevenue ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Seller Revenue ',
//       type: 'sellerRevenue',
//       value: dashboardData.cardsData?.totalSellerRevenue ?? 0,
//       data: selectedStat,
//     },

//     {
//       title: 'Razorpay Charges',
//       type: 'razorpayCharges',
//       value: dashboardData.cardsData?.totalPaymentGatewayCharges ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Seller POS Revenue',
//       type: 'sellerPOSRevenue',
//       value: dashboardData.cardsData?.totalSellerPOS ?? 0,
//       data: selectedStat,
//     },
//   ];
//   const mynyfyRevenueCards = [
//     {
//       title: 'Total',
//       type: 'totalMynyfyRevenue',
//       value: totalmynyfyRevenue,
//       data: selectedStat,
//     },
//     {
//       title: 'Orders',
//       type: 'ordersRevenue',
//       value: dashboardData.cardsData?.totalOrderSubscriptionCommission ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Subscription from reseller',
//       type: 'subscriptionMynyfyRevenue',
//       value: dashboardData.cardsData?.totalSubscriptionCommissions ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Subscription from Brand',
//       type: 'totalBrandSubscriptionCommissions',
//       value: dashboardData.cardsData?.totalBrandSubscriptionCommissions ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: "Ad's Revenue",
//       type: 'AdsMynyfyRevenue',
//       value: dashboardData.cardsData?.totalAdsCommissions ?? 0,
//       data: selectedStat,
//     },
//     {
//       title: 'Pocket stores Revenue',
//       type: 'pocketStoresRevenue',
//       value: dashboardData.cardsData?.totalPocketStoresRevenue ?? 0,
//       data: selectedStat,
//     },
//   ];

//   const formatNumber = (num) => {
//     if (!num) return '0';
//     return Number(num).toString();
//   };

//   function formatLargeNumber(num) {
//     if (!num || isNaN(num)) return '0';
//     num = Number(num);
//     if (num >= 10000000) return (num / 10000000).toFixed(2) + 'Cr'; // Crore
//     if (num >= 100000) return (num / 100000).toFixed(2) + 'L'; // Lakh
//     if (num >= 1000) return (num / 1000).toFixed(2) + 'K'; // Thousand
//     return num.toFixed(2);
//   }

//   const handleRefresh = () => {
//     setRefresh({ start: true, stop: false });
//     setTimeout(() => {
//       setRefresh({ start: false, stop: true });
//     }, 1000);
//   };

//   const getTopBrands = async () => {
//     const body = { profile: 'Brand' };
//     if (startDate) {
//       body.fromDate = startDate._d;
//     }
//     if (endDate) {
//       body.toDate = endDate._d;
//     }

//     try {
//       const res = await dashBoardService.getTop5Brands(body);
//       dispatch(setDashboardData({ section: 'topSellingBrands', value: res?.data }));
//     } catch (error) {
//       console.error('❌ Error fetching top brands:', error);
//     }
//   };
//   const getTopSeller = async () => {
//     const body = { profile: 'Seller' };
//     if (startDate) {
//       body.fromDate = startDate._d;
//     }
//     if (endDate) {
//       body.toDate = endDate._d;
//     }
//     try {
//       const res = await dashBoardService.getTop5Seller(body);
//       dispatch(setDashboardData({ section: 'topSellingResellers', value: res?.data }));
//     } catch (error) {
//       console.error('❌ Error fetching top brands:', error);
//     }
//   };

//   return (
//     <PageLayout>
//       <PageHeader
//         title={'Overview'}
//         actions={
//           <div style={{ padding: '0 1.5rem', color: '#ccc', fontSize: '0.95rem' }}>
//             {/* <MynyfyWebSelect
//               label='supportProfiles'
//               list={namesList.map((res) => ({ label: res.name, value: res._id, data: res.data }))}
//               value={selectedName}
//               onChange={handleSupportChange}
//             /> */}
//             <MynyfyText
//               title={`Hello! ${profile?.name}`}
//               style={{
//                 fontWeight: 600,
//                 background: 'linear-gradient(90deg, #c084fc, #a855f7)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}
//             />
//             <div
//               style={{
//                 fontSize: '0.73rem',
//                 color: '#888',
//                 marginTop: '2px',
//                 fontFeatureSettings: "'tnum' 1", // tabular numbers → better alignment
//               }}
//             >
//               {new Date().toLocaleTimeString([], {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: false,
//               })}
//             </div>
//           </div>
//         }
//       ></PageHeader>
//       <PageBody>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <Box
//             className='rowSB'
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               flexDirection: 'row',
//               gap: '10px',
//               mb: '20px',
//             }}
//           >
//             {['Today', 'Week', 'Month', 'Custom', 'All'].map((tab, i) => (
//               <Box
//                 key={i}
//                 className='rowC'
//                 sx={{
//                   cursor: 'pointer',
//                   fontFamily: filter === tab ? 'MynyfySemiBold' : 'MynyfyMedium',
//                   px: { xs: 1, sm: 2 },
//                   py: { xs: 0.5, sm: 1.5 },
//                   textAlign: 'center',
//                   backgroundColor: filter === tab ? '#3076b5' : 'white',
//                   color: filter === tab ? 'white' : '#3076b5',
//                   border: '1px solid #3076b5',
//                   borderRadius: '5px',
//                   fontSize: { xs: '11px', sm: '14px' },
//                   minWidth: {
//                     xs: i < 3 ? '22%' : '22%',
//                     sm: 'auto',
//                   },
//                 }}
//                 onClick={(e) => {
//                   setFilter(tab);
//                   if (tab === 'Custom') {
//                     handleClick(e);
//                   } else if (tab === 'Month') {
//                     handleMonthButtonClick(e);
//                   } else {
//                     handleRangeFilter(tab);
//                   }
//                 }}
//               >
//                 <MynyfyText title={tab} color={filter === tab ? 'white' : '#3076b5'} />
//               </Box>
//             ))}

//             {/* Month Selector Popover */}
//             <Popover
//               open={Boolean(monthAnchorEl)}
//               anchorEl={monthAnchorEl}
//               onClose={() => setMonthAnchorEl(null)}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{
//                 '& .MuiPaper-root': {
//                   margin: '10px -10px',
//                   padding: { xs: '10px', sm: '15px' },
//                   borderRadius: '6px',
//                   minWidth: { xs: '250px', sm: '320px' },
//                 },
//               }}
//             >
//               <Box>
//                 {/* Year Selector */}
//                 <Box sx={{ mb: 1 }}>
//                   <label
//                     style={{
//                       fontSize: '12px',
//                       fontFamily: 'MynyfyMedium',
//                     }}
//                   >
//                     Year:{' '}
//                     <select
//                       value={selectedYear}
//                       onChange={handleYearChange}
//                       style={{
//                         width: 'auto',
//                         padding: '4px',
//                         fontSize: '12px',
//                         borderRadius: '4px',
//                         border: '1px solid #ccc',
//                         fontFamily: 'MynyfyMedium',
//                       }}
//                     >
//                       {Array.from({ length: 11 }, (_, i) => {
//                         const year = moment().year() - 5 + i;
//                         return (
//                           <option key={year} value={year}>
//                             {year}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   </label>
//                 </Box>

//                 {/* Month Grid */}
//                 <Box
//                   sx={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(4, 1fr)',
//                     gap: { xs: '6px', sm: '8px' },
//                   }}
//                 >
//                   {months.map((monthName, idx) => (
//                     <button
//                       key={monthName}
//                       onClick={() => handleMonthSelect(idx)}
//                       style={{
//                         padding: window.innerWidth < 600 ? '5px 6px' : '6px 10px',
//                         background:
//                           selectedMonth === idx && filter === 'Month' ? '#3076b5' : '#eee',
//                         color: selectedMonth === idx && filter === 'Month' ? 'white' : '#3076b5',
//                         border: '1px solid #3076b5',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontFamily: 'MynyfyMedium',
//                         fontSize: window.innerWidth < 600 ? '11px' : '12px',
//                       }}
//                     >
//                       {monthName}
//                     </button>
//                   ))}
//                 </Box>
//               </Box>
//             </Popover>

//             {/* Custom Date Range Popover */}
//             {filter === 'Custom' && (
//               <Popover
//                 id='basic-menu'
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl) && filter === 'Custom'}
//                 onClose={Close}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left',
//                 }}
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left',
//                 }}
//                 MenuListProps={{
//                   'aria-labelledby': 'basic-button',
//                 }}
//                 sx={{
//                   '& .MuiPaper-root': {
//                     margin: '10px -10px',
//                     padding: '15px',
//                     borderRadius: '6px',
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: { md: 'flex', xs: 'block' },
//                     justifyContent: 'flex-start',
//                     alignItems: 'center',
//                     gap: '10px',
//                   }}
//                 >
//                   {/* Start Date */}
//                   <MobileDatePicker
//                     label='Start'
//                     className='datePicker'
//                     name='startDate'
//                     value={customDateRange.startDate ? moment(customDateRange.startDate) : null}
//                     onChange={(newValue) =>
//                       handleCustomDateChange(
//                         newValue ? newValue.format('YYYY-MM-DD') : '',
//                         customDateRange.endDate
//                       )
//                     }
//                     maxDate={moment()}
//                     sx={{
//                       width: { xs: '120px', sm: '150px' }, // Smaller width on mobile
//                       '& .MuiInputBase-root': {
//                         backgroundColor: '#f9f9fa',
//                         borderRadius: '5px',
//                         fontFamily: 'MynyfyMedium',
//                         fontSize: { xs: '11px', sm: '12px' },
//                         minHeight: '32px', // shorter height
//                       },
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#eeeeee',
//                       },
//                     }}
//                   />

//                   {/* End Date */}
//                   <MobileDatePicker
//                     label='End'
//                     className='datePicker'
//                     name='endDate'
//                     value={customDateRange.endDate ? moment(customDateRange.endDate) : null}
//                     onChange={(newValue) =>
//                       handleCustomDateChange(
//                         customDateRange.startDate,
//                         newValue ? newValue.format('YYYY-MM-DD') : ''
//                       )
//                     }
//                     maxDate={moment()}
//                     sx={{
//                       width: { xs: '120px', sm: '150px' },
//                       '& .MuiInputBase-root': {
//                         backgroundColor: '#f9f9fa',
//                         borderRadius: '5px',
//                         fontFamily: 'MynyfyMedium',
//                         fontSize: { xs: '11px', sm: '12px' },
//                         minHeight: '32px',
//                       },
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#eeeeee',
//                       },
//                     }}
//                   />

//                   {/* Check Icon */}
//                   <IconButton
//                     onClick={() => {
//                       handleRangeFilter('Custom');
//                       setAnchorEl(null);
//                     }}
//                     sx={{
//                       backgroundColor: '#3076b5',
//                       color: '#fff',
//                       borderRadius: '5px',
//                       height: { xs: '32px', sm: '40px' }, // smaller on mobile
//                       width: { xs: '32px', sm: '40px' },
//                       '& svg': {
//                         fontSize: { xs: '18px', sm: '22px' }, // shrink icon
//                       },
//                       '&:hover': { backgroundColor: '#245a8d' },
//                     }}
//                   >
//                     <CheckIcon />
//                   </IconButton>

//                   {/* Close Icon */}
//                   <IconButton
//                     onClick={() => {
//                       handleCustomDateChange('', '');
//                       setAnchorEl(null);
//                     }}
//                     sx={{
//                       backgroundColor: '#3076b5',
//                       color: '#fff',
//                       borderRadius: '5px',
//                       height: { xs: '32px', sm: '40px' },
//                       width: { xs: '32px', sm: '40px' },
//                       '& svg': {
//                         fontSize: { xs: '18px', sm: '22px' },
//                       },
//                       '&:hover': { backgroundColor: '#245a8d' },
//                     }}
//                   >
//                     <CloseIcon />
//                   </IconButton>
//                 </Box>
//               </Popover>
//             )}
//           </Box>
//         </div>

//         <Typography
//           variant='h6'
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             fontSize: { xs: 20, sm: 20, md: 28 },
//             ml: 2,
//             mt: 2,
//             mb: '-30px',
//           }}
//         >
//           Mynyfy Revenue
//         </Typography>

//         <Box
//           mt={6}
//           px={2}
//           py={3}
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 2,
//             justifyContent: { xs: 'space-between', md: 'center' }, // mobile: space-between, desktop: center
//           }}
//         >
//           {mynyfyRevenueCards.map((stat, index) => (
//             <Paper
//               key={index}
//               elevation={3}
//               sx={{
//                 width: {
//                   xs: '40%', // two cards per row in mobile
//                   sm: '40%',
//                   md: 180, // fixed card size in desktop
//                 },
//                 height: {
//                   xs: 90,
//                   sm: 100,
//                 },
//                 borderRadius: 3,
//                 padding: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}
//             >
//               <Typography fontWeight={600} fontSize={{ xs: 13, sm: 16, md: 18 }}>
//                 {stat.title}
//               </Typography>
//               <Typography
//                 color='primary'
//                 mt={2}
//                 fontWeight={600}
//                 fontSize={{ xs: 14, sm: 16, md: 20 }}
//               >
//                 {formatLargeNumber(stat.value)}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>
//         <Typography
//           variant='h6'
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             fontSize: { xs: 20, sm: 20, md: 28 },
//             ml: 2,
//             mt: 2,
//             mb: '-30px',
//           }}
//         >
//           Brand Revenue
//         </Typography>
//         <Box
//           mt={6}
//           px={2}
//           py={3}
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 2,
//             justifyContent: {
//               xs: 'space-between',
//               md: 'center',
//             },
//           }}
//         >
//           {brandRevenueCards.map((stat, index) => (
//             <Paper
//               key={index}
//               elevation={3}
//               sx={{
//                 width: {
//                   xs: '40%',
//                   sm: '40%',
//                   md: 180,
//                 },
//                 height: {
//                   xs: 90,
//                   sm: 100,
//                 },
//                 borderRadius: 3,
//                 padding: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}
//             >
//               <Typography
//                 variant='subtitle1'
//                 fontWeight={600}
//                 fontSize={{ xs: 13, sm: 16, md: 18 }}
//               >
//                 {stat.title}
//               </Typography>
//               <Typography
//                 variant='h6'
//                 color='primary'
//                 mt={2}
//                 fontWeight={600}
//                 fontSize={{ xs: 14, sm: 16, md: 20 }}
//               >
//                 {formatLargeNumber(stat.value)}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>
//         <Typography
//           variant='h6'
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             fontSize: { xs: 20, sm: 20, md: 28 },
//             ml: 2,
//             mt: 2,
//             mb: '-30px',
//           }}
//         >
//           E Commerce
//         </Typography>

//         <Box
//           mt={6}
//           px={2}
//           py={3}
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 2,
//             justifyContent: { xs: 'space-between', md: 'center' },
//           }}
//         >
//           {ecommerceCard.map((stat, index) => (
//             <Paper
//               key={index}
//               elevation={3}
//               sx={{
//                 width: {
//                   xs: '40%',
//                   sm: '40%',
//                   md: 180,
//                 },
//                 height: {
//                   xs: 90,
//                   sm: 100,
//                 },
//                 borderRadius: 3,
//                 padding: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}
//             >
//               <Typography
//                 variant='subtitle1'
//                 fontWeight={600}
//                 fontSize={{ md: 18, xs: 13, sm: 16 }}
//               >
//                 {stat.title}
//               </Typography>
//               <Typography
//                 variant='h6'
//                 color='primary'
//                 mt={3}
//                 fontWeight={600}
//                 fontSize={{ xs: 14, sm: 16, md: 20 }}
//               >
//                 {formatNumber(stat.value)}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>

//         <Box mt={4} px={2}>
//           <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
//             Most Selling Brands
//           </Typography>

//           <Paper elevation={3} sx={{ borderRadius: 4, overflowX: 'auto' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                     <strong>Logo</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                     <strong>Url</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Total Orders</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Total Revenue</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {dashboardData.topSellingBrands?.length > 0 ? (
//                   [...dashboardData.topSellingBrands]
//                     .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0)) // Sort by revenue descending
//                     .map((brand, index) => (
//                       <TableRow key={brand.id || index}>
//                         <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                           <Avatar src={brand.logo} alt={brand.name} />
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             color: '#1976d2',
//                             cursor: 'pointer',
//                             '&:hover': { textDecoration: 'underline' },
//                           }}
//                           onClick={() =>
//                             navigate(AppRoute.BRAND_DETAILS, {
//                               state: { details: brand },
//                             })
//                           }
//                         >
//                           {brand.name}
//                         </TableCell>
//                         <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                           {brand.urlId || 'N/A'}
//                         </TableCell>
//                         <TableCell>{brand.orderCount ?? 0}</TableCell>
//                         <TableCell>
//                           {brand.totalRevenue != null
//                             ? `₹${brand.totalRevenue.toLocaleString('en-IN', {
//                               maximumFractionDigits: 0,
//                               minimumFractionDigits: 0,
//                             })}`
//                             : '₹0'}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} align='center'>
//                       No top brands available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Box>

//         <Box mt={4} px={2}>
//           <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
//             Top 5 Sellers
//           </Typography>

//           <Paper elevation={3} sx={{ borderRadius: 4, overflowX: 'auto' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                     <strong>Logo</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                     <strong>Url</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Total Orders</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Total Revenue</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {dashboardData.topSellingResellers?.length > 0 ? (
//                   [...dashboardData.topSellingResellers]
//                     .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0)) // Sort by revenue descending
//                     .map((seller, index) => (
//                       <TableRow key={seller.id || index}>
//                         <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                           <Avatar src={seller.logo} alt={seller.name} />
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             color: '#1976d2',
//                             cursor: 'pointer',
//                             '&:hover': { textDecoration: 'underline' },
//                           }}
//                           onClick={() =>
//                             navigate(AppRoute.STORE_DETAILS, {
//                               state: { details: seller },
//                             })
//                           }
//                         >
//                           {seller.name}
//                         </TableCell>
//                         <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
//                           {seller.urlId || 'N/A'}
//                         </TableCell>
//                         <TableCell>{seller.orderCount ?? 0}</TableCell>
//                         <TableCell>
//                           {seller.totalRevenue != null
//                             ? `₹${seller.totalRevenue.toLocaleString('en-IN', {
//                               maximumFractionDigits: 0,
//                               minimumFractionDigits: 0,
//                             })}`
//                             : '₹0'}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} align='center'>
//                       No top seller available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Box>

//         <Box mt={4} px={2}></Box>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Home;
//---------------------------------coupons index.jsx---------------------------------------------------------
// import React from 'react';
// import { PageBody, PageHeader, PageLayout } from '../../Layout/PageLayout';
// import {
//   Box,
//   Typography,
//   useMediaQuery,
//   Modal,
//   Card,
//   Pagination,
//   Popover,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { CardMedia, CardContent } from '@mui/material';
// import MynyfyButton from '../../../components/MynyfyButton';
// import { Apps, FormatListBulleted } from '@mui/icons-material';
// import moment from 'moment';
// import { useTheme } from '@mui/material/styles';
// import { MarketingPageBody } from '../MarketingPageBody';
// import CouponDetails from './CouponDetails';
// import { AppRoute } from '../../../constants/mynyfyRoutes.const';
// import { useNavigate } from 'react-router';
// import { MobileDatePicker } from '@mui/x-date-pickers';
// import MynyfyText from '../../../components/MynyfyText';
// import MynyfyTable from '../../../components/MynyfyTable';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { useCoupons } from '../../../hooks/useCoupons';
// import AddIcon from '@mui/icons-material/Add';

// const PageData = {
//   TITLE: (value) => `Coupons(${value || 0})`,
// };

// const Coupons = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [view, setView] = React.useState('list');
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const {
//     colDefs,
//     data,
//     totalPromos,
//     handleRangeFilter,
//     handleCustomDateChange,
//     handleYearChange,
//     handleMonthSelect,
//     handleMonthButtonClick,
//     customDateRange,
//     selectedMonth,
//     selectedYear,
//     monthAnchorEl,
//     setMonthAnchorEl,
//     filter,
//     setFilter,
//     anchorEl,
//     setAnchorEl,
//     onFilterChange,
//     searchFilters,
//     dropdownFilters,
//     handleOpenCoupon,
//     onPageChange,
//     setPageSize,
//     pageSize,
//     page,
//     selectedCoupon,
//     couponDetails,
//     handleCloseCoupon,
//     handleClick,
//     refresh,
//     searchQuery,
//     setSearchQuery,
//     onCellClicked,
//   } = useCoupons();

//   return (
//     <PageLayout>
//       <PageHeader
//         title={
//           isMobile ? (
//             <>
//               {/* First line: title and + icon */}
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   width: '100%',
//                   marginBottom: '10px',
//                 }}
//               >
//                 <span style={{ fontSize: '18px', fontWeight: 600 }}>
//                   {PageData.TITLE(totalPromos)}
//                 </span>
//                 {/* Buttons: Grid/List Toggle + Create */}
//                 <Box display='flex' alignItems='center' gap={1}>
//                   {/* Create Coupon (+) */}
//                   <IconButton
//                     onClick={() => navigate(AppRoute.CREATE_COUPONS, {})}
//                     sx={{
//                       backgroundColor: '#3076b5',
//                       color: '#fff',
//                       borderRadius: '25px',
//                       height: '22px',
//                       width: '22px',
//                       padding: 0,
//                       '&:hover': { backgroundColor: '#245a8d' },
//                     }}
//                   >
//                     <AddIcon sx={{ fontSize: '18px' }} />
//                   </IconButton>

//                   {/* Grid/List Toggle */}
//                 </Box>
//               </div>

//               {/* Second line: filter buttons */}
//               <div
//                 style={{
//                   display: 'flex',
//                   flexWrap: 'nowrap', // Ensure buttons stay in one row
//                   overflowX: 'auto',
//                   gap: '4px',
//                   marginBottom: '10px',
//                 }}
//               >
//                 <Tooltip title={view === 'grid' ? 'List View' : 'Grid View'}>
//                   <IconButton
//                     onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
//                     sx={{
//                       border: '1px solid #3076b5',
//                       borderRadius: '4px',
//                       color: '#3076b5',
//                       height: '24px',
//                       width: '24px',
//                       padding: 0,
//                       '&:hover': {
//                         backgroundColor: '#3076b5',
//                         color: '#fff',
//                       },
//                     }}
//                   >
//                     {view === 'grid' ? (
//                       <FormatListBulleted sx={{ fontSize: '15px' }} />
//                     ) : (
//                       <Apps sx={{ fontSize: '15px' }} />
//                     )}
//                   </IconButton>
//                 </Tooltip>
//                 {['Today', 'Week', 'Month', 'Custom', 'All'].map((tab, i) => (
//                   <Box
//                     key={i}
//                     style={{
//                       cursor: 'pointer',
//                       fontFamily: filter === tab ? 'MynyfySemiBold' : 'MynyfyMedium',
//                       padding: '4px 8px', // smaller padding for mobile
//                       fontSize: '10px', // smaller font size
//                       backgroundColor: filter === tab ? '#3076b5' : 'white',
//                       color: filter === tab ? 'white' : '#3076b5',
//                       border: '1px solid #3076b5',
//                       borderRadius: '4px',
//                       whiteSpace: 'nowrap',
//                       flexShrink: 0, // prevent shrinking in overflow
//                     }}
//                     onClick={(e) => {
//                       setFilter(tab);
//                       if (tab === 'Custom') handleClick(e);
//                       else if (tab === 'Month') handleMonthButtonClick(e);
//                       else handleRangeFilter(tab);
//                     }}
//                   >
//                     <MynyfyText title={tab} color={filter === tab ? 'white' : '#3076b5'} />
//                   </Box>
//                 ))}
//               </div>
//             </>
//           ) : (
//             PageData.TITLE(totalPromos)
//           )
//         }
//         description={isMobile ? null : 'Manage all your Coupons here'}
//         actions={
//           !isMobile && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Tooltip title={view === 'grid' ? 'Grid View' : 'List View'}>
//                 <IconButton
//                   onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
//                   sx={{
//                     border: '1px solid #3076b5',
//                     borderRadius: '5px',
//                     color: '#3076b5',
//                     ml: 2,
//                     '&:hover': {
//                       backgroundColor: '#3076b5',
//                       color: '#fff',
//                     },
//                   }}
//                 >
//                   {view === 'grid' ? <FormatListBulleted /> : <Apps />}
//                 </IconButton>
//               </Tooltip>
//               {['Today', 'Week', 'Month', 'Custom', 'All'].map((tab, i) => (
//                 <Box
//                   key={i}
//                   onClick={(e) => {
//                     setFilter(tab);
//                     if (tab === 'Custom') handleClick(e);
//                     else if (tab === 'Month') handleMonthButtonClick(e);
//                     else handleRangeFilter(tab);
//                   }}
//                   style={{
//                     cursor: 'pointer',
//                     fontFamily: filter === tab ? 'MynyfySemiBold' : 'MynyfyMedium',
//                     padding: '10px 15px',
//                     fontSize: '14px',
//                     backgroundColor: filter === tab ? '#3076b5' : 'white',
//                     color: filter === tab ? 'white' : '#3076b5',
//                     border: '1px solid #3076b5',
//                     borderRadius: '5px',
//                   }}
//                 >
//                   <MynyfyText title={tab} color={filter === tab ? 'white' : '#3076b5'} />
//                 </Box>
//               ))}

//               <MynyfyButton
//                 label='Create Coupon'
//                 onClick={() => navigate(AppRoute.CREATE_COUPONS, {})}
//               />
//             </div>
//           )
//         }
//       />

//       {/* === Month Popover === */}
//       <Popover
//         open={Boolean(monthAnchorEl)}
//         anchorEl={monthAnchorEl}
//         onClose={() => setMonthAnchorEl(null)}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         sx={{
//           '& .MuiPaper-root': {
//             margin: '10px -10px',
//             padding: '15px',
//             borderRadius: '6px',
//             minWidth: 320,
//             '@media (max-width:600px)': {
//               minWidth: 240,
//               padding: '10px',
//               margin: '5px -5px',
//             },
//           },
//         }}
//       >
//         <div style={{ padding: 10 }}>
//           <div style={{ marginBottom: 10 }}>
//             <label>
//               Year:{' '}
//               <select
//                 value={selectedYear}
//                 onChange={handleYearChange}
//                 style={{ width: 100, padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
//               >
//                 {Array.from({ length: 11 }, (_, i) => {
//                   const year = moment().year() - 5 + i;
//                   return (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   );
//                 })}
//               </select>
//             </label>
//           </div>
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns for both desktop & mobile
//               gap: '8px',
//             }}
//           >
//             {moment.months().map((monthName, idx) => (
//               <Box
//                 component='button'
//                 key={monthName}
//                 onClick={() => handleMonthSelect(idx)}
//                 sx={{
//                   paddingY: { xs: '4px', sm: '6px' }, // vertical padding
//                   paddingX: { xs: '4px', sm: '6px' }, // reduce horizontal padding for smaller buttons
//                   backgroundColor: selectedMonth === idx && filter === 'Month' ? '#3076b5' : '#eee',
//                   color: selectedMonth === idx && filter === 'Month' ? 'white' : '#3076b5',
//                   border: '1px solid #3076b5',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontFamily: 'MynyfyMedium',
//                   fontSize: { xs: '10px', sm: '12px' },
//                   textAlign: 'center',
//                   width: '100%',
//                   minWidth: { xs: 50, sm: 70 }, // set minimum width smaller on mobile
//                   maxWidth: 80, // max width to keep consistent button size
//                   boxSizing: 'border-box',
//                 }}
//               >
//                 {monthName}
//               </Box>
//             ))}
//           </div>
//         </div>
//       </Popover>

//       {/* === Custom Popover === */}
//       {filter === 'Custom' && (
//         <Popover
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && filter === 'Custom'}
//           onClose={() => setAnchorEl(null)}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'left',
//           }}
//           sx={{
//             '& .MuiPaper-root': {
//               margin: '10px -10px',
//               padding: '15px',
//               borderRadius: '6px',
//               minWidth: 320,
//               '@media (max-width:600px)': {
//                 minWidth: 280, // slightly smaller popover width on mobile
//                 padding: '10px',
//                 margin: '5px -5px',
//               },
//             },
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//               gap: { xs: '8px', md: '10px' },
//               flexWrap: 'nowrap', // prevent wrapping on mobile
//             }}
//           >
//             <MobileDatePicker
//               label='Start Date'
//               className='datePicker'
//               name='startDate'
//               value={customDateRange.startDate ? moment(customDateRange.startDate) : null}
//               onChange={(newValue) =>
//                 handleCustomDateChange(
//                   newValue ? newValue.format('YYYY-MM-DD') : '',
//                   customDateRange.endDate
//                 )
//               }
//               sx={{
//                 width: { xs: 110, md: 150 }, // smaller width on mobile
//                 '& .MuiInputBase-root': {
//                   backgroundColor: '#f9f9fa',
//                   borderRadius: '5px',
//                   fontFamily: 'MynyfyMedium',
//                   fontSize: { xs: '10px', md: '12px' },
//                   minHeight: { xs: '30px', md: '36px' },
//                   padding: '0 8px',
//                 },
//               }}
//             />
//             <MobileDatePicker
//               label='End Date'
//               className='datePicker'
//               name='endDate'
//               value={customDateRange.endDate ? moment(customDateRange.endDate) : null}
//               onChange={(newValue) =>
//                 handleCustomDateChange(
//                   customDateRange.startDate,
//                   newValue ? newValue.format('YYYY-MM-DD') : ''
//                 )
//               }
//               sx={{
//                 width: { xs: 110, md: 150 },
//                 '& .MuiInputBase-root': {
//                   backgroundColor: '#f9f9fa',
//                   borderRadius: '5px',
//                   fontFamily: 'MynyfyMedium',
//                   fontSize: { xs: '10px', md: '12px' },
//                   minHeight: { xs: '30px', md: '36px' },
//                   padding: '0 8px',
//                 },
//               }}
//             />
//             <IconButton
//               onClick={() => {
//                 handleRangeFilter('Custom');
//                 setAnchorEl(null);
//               }}
//               sx={{
//                 backgroundColor: '#3076b5',
//                 color: '#fff',
//                 borderRadius: '5px',
//                 height: { xs: 32, md: 40 }, // smaller on mobile
//                 width: { xs: 32, md: 40 },
//                 '&:hover': { backgroundColor: '#245a8d' },
//                 flexShrink: 0,
//               }}
//             >
//               <CheckIcon fontSize='small' />
//             </IconButton>

//             <IconButton
//               onClick={() => {
//                 handleCustomDateChange('', '');
//                 setAnchorEl(null);
//               }}
//               sx={{
//                 backgroundColor: '#3076b5',
//                 color: '#fff',
//                 borderRadius: '5px',
//                 height: { xs: 32, md: 40 },
//                 width: { xs: 32, md: 40 },
//                 '&:hover': { backgroundColor: '#245a8d' },
//                 flexShrink: 0,
//               }}
//             >
//               <CloseIcon fontSize='small' />
//             </IconButton>
//           </Box>
//         </Popover>
//       )}

//       <PageBody backgroundColor='#fff' sx={{ position: 'relative' }}>
//         {view === 'grid' ? (
//           <MarketingPageBody view='grid'>
//             {data.length > 0 ? (
//               data.map((coupon) => (
//                 <Card
//                   key={coupon?._id}
//                   onClick={() => handleOpenCoupon(coupon)}
//                   sx={{
//                     width: {
//                       xs: '95%', // Full width on mobile
//                       sm: 240, // Fixed width on desktop
//                     },
//                     borderRadius: 2,
//                     boxShadow: 2,
//                     cursor: 'pointer',
//                     m: {
//                       xs: '6px 0',
//                       sm: 1,
//                     },
//                     mr: {
//                       xs: 0,
//                       sm: 2,
//                     },
//                     overflow: 'hidden',
//                     transition: '0.3s',
//                     '&:hover': { boxShadow: 4 },
//                     flexShrink: 0,
//                   }}
//                 >
//                   {/* Image or fallback with overlay label */}
//                   <Box
//                     sx={{
//                       position: 'relative',
//                       height: {
//                         xs: 100,
//                         sm: 140,
//                       },
//                       width: '100%',
//                     }}
//                   >
//                     {coupon?.image?.url ? (
//                       <CardMedia
//                         component='img'
//                         image={coupon.image.url}
//                         alt={coupon.description}
//                         sx={{
//                           height: '100%',
//                           width: '100%',
//                           objectFit: 'cover',
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         sx={{
//                           height: '100%',
//                           width: '100%',
//                           bgcolor: '#3076b5',
//                           display: 'flex',
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           color: 'white',
//                           textAlign: 'center',
//                           px: 1,
//                         }}
//                       >
//                         <Typography variant='body1' fontWeight='bold'>
//                           Get ₹{coupon.actualPrice} off
//                         </Typography>
//                         {coupon.minimumOrderValue && (
//                           <Typography variant='caption' mt={0.5} sx={{ fontSize: '0.7rem' }}>
//                             Min order: ₹{coupon.minimumOrderValue}
//                           </Typography>
//                         )}
//                       </Box>
//                     )}

//                     {/* Overlay Label */}
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         left: 8,
//                         backgroundColor: '#dedb1eff',
//                         color: '#1f1b1bff',
//                         px: 1,
//                         py: 0.3,
//                         borderRadius: '16px',
//                         fontSize: '0.65rem',
//                         fontWeight: 600,
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.5px',
//                       }}
//                     >
//                       {coupon?.drawId?.name}
//                     </Box>
//                   </Box>

//                   {/* Card content */}
//                   <CardContent
//                     sx={{
//                       textAlign: 'center',
//                       py: {
//                         xs: 1,
//                         sm: 1.5,
//                       },
//                       px: 1.5,
//                     }}
//                   >
//                     {/* Coupon Name */}
//                     <Typography
//                       variant='subtitle2'
//                       fontWeight='bold'
//                       color='primary'
//                       sx={{
//                         fontSize: {
//                           xs: '0.8rem',
//                           sm: '0.95rem',
//                         },
//                       }}
//                     >
//                       {coupon?.name || ''}
//                     </Typography>

//                     {/* Discount */}
//                     <Typography
//                       variant='body1'
//                       color='text.primary'
//                       sx={{
//                         fontSize: {
//                           xs: '0.95rem',
//                           sm: '1.1rem',
//                         },
//                         mt: 0.5,
//                       }}
//                     >
//                       ₹{coupon.actualPrice} off
//                     </Typography>

//                     {/* Coupon counts */}
//                     <Box
//                       display='flex'
//                       justifyContent='space-between'
//                       mt={1}
//                       px={0.5}
//                       color='error.main'
//                       sx={{
//                         flexDirection: {
//                           xs: 'column',
//                           sm: 'row',
//                         },
//                         alignItems: {
//                           xs: 'center',
//                           sm: 'flex-start',
//                         },
//                         gap: 0.5,
//                       }}
//                     >
//                       <MynyfyText title={`${coupon?.count ?? '∞'} Coupons`} error />
//                       <MynyfyText
//                         title={`${coupon.count === null ? '∞' : coupon.count - coupon.claims} Left`}
//                         error
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Typography
//                 align='center'
//                 color='textSecondary'
//                 variant='body2'
//                 fontSize='14px'
//                 sx={{ mt: 2 }}
//               >
//                 No Coupons Available
//               </Typography>
//             )}
//           </MarketingPageBody>
//         ) : (
//           <MynyfyTable
//             colDefs={colDefs}
//             data={data}
//             page={page - 1}
//             pageSize={pageSize}
//             totalPages={totalPromos}
//             searchFilters={searchFilters}
//             onFiltersChange={onFilterChange}
//             dropdownFilters={dropdownFilters}
//             getCurrentPage={(value) => onPageChange(value + 1)}
//             getCurrentPageSize={(value) => setPageSize(value)}
//             onCellClicked={onCellClicked}
//           />
//         )}
//         {view === 'grid' && totalPromos ? (
//           <Box display='flex' justifyContent='center' mt={2}>
//             <Pagination
//               count={Math.ceil(totalPromos / pageSize)}
//               onChange={(e, newPage) => onPageChange(newPage)}
//               page={page}
//               color='primary'
//             />
//           </Box>
//         ) : null}
//       </PageBody>

//       <Modal
//         open={couponDetails}
//         onClose={handleCloseCoupon}
//         sx={{
//           display: 'flex',
//           alignItems: isMobile ? 'flex-start' : 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Box
//           sx={
//             isMobile
//               ? {
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 bgcolor: 'background.paper',
//                 boxShadow: 24,
//                 display: 'flex',
//                 flexDirection: 'column',
//               }
//               : {
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '100%',
//                 maxWidth: '700px',
//                 bgcolor: 'background.paper',
//                 boxShadow: 24,
//                 p: 4,
//                 borderRadius: 2,
//               }
//           }
//         >
//           {/* mobile sticky header */}
//           {isMobile && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'flex-end',
//                 p: 1,
//                 borderBottom: '1px solid #ddd',
//                 position: 'sticky',
//                 top: 0,
//                 bgcolor: 'background.paper',
//                 zIndex: 10,
//               }}
//             >
//               <MynyfyButton
//                 label={'✖'}
//                 style={{
//                   backgroundColor: '#4099d4',
//                   color: '#fff',
//                   padding: '4px',
//                   minWidth: '32px',
//                   height: '32px',
//                   borderRadius: '50%',
//                   fontSize: '14px',
//                 }}
//                 onClick={handleCloseCoupon}
//                 aria-label='Close modal'
//               />
//             </Box>
//           )}

//           {/* web close button */}
//           {!isMobile && (
//             <MynyfyButton
//               label={'✖'}
//               style={{
//                 backgroundColor: '#4099d4',
//                 color: '#fff',
//                 padding: '4px',
//                 minWidth: '32px',
//                 height: '32px',
//                 borderRadius: '50%',
//                 fontSize: '14px',
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 zIndex: 1300,
//               }}
//               onClick={handleCloseCoupon}
//               aria-label='Close modal'
//             />
//           )}
//           <Box
//             sx={{
//               flex: 1,
//               overflowY: isMobile ? 'auto' : 'visible',
//               p: isMobile ? 2 : 0,
//             }}
//           >
//             {selectedCoupon && <CouponDetails details={selectedCoupon} />}
//           </Box>
//         </Box>
//       </Modal>
//     </PageLayout>
//   );
// };

// export default Coupons;

