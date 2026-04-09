import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { paths } from "./paths";
import InitLayout, { LAYOUT } from "../layouts/init-layout";
import { SplashScreen } from "@/components/loading";
import { AuthRoute } from "./auth-route";
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const InfoPage = lazy(() => import("@/pages/content/info"));
const Page404Page = lazy(() => import("@/pages/error/page404"));
const RequestBookingPage = lazy(() => import("@/pages/content/request-booking"));
const DetailRequestPage = lazy(() => import("@/pages/content/detail-request"));
const RequestCustomizePage = lazy(() => import("@/pages/content/request-customize"));
const DetailRequestCustomizePage = lazy(() => import("@/pages/content/detail-request-customize"));
const QuotePage = lazy(() => import("@/pages/content/quote"));
const DetailQuotePage = lazy(() => import("@/pages/content/detail-quote"));
const ServicePage = lazy(() => import("@/pages/content/service"));
const DetailServicePage = lazy(() => import("@/pages/content/detail-service"));
const FeedbackPage = lazy(() => import("@/pages/content/feedback"));
const PricingPage = lazy(() => import("@/pages/content/pricing"));
const ReportsFinancePage = lazy(() => import("@/pages/content/report-finance"));
const DetailReportsFinancePage = lazy(() => import("@/pages/content/detail-report-finance"));
const ReportApprovedPage = lazy(() => import("@/pages/content/report-approved"));
const AgentPage = lazy(() => import("@/pages/content/agent"));
const TourBookingsPage = lazy(() => import("@/pages/content/tour-bookings"));
const TourCancelledPage = lazy(() => import("@/pages/content/tour-cancelled"));
const TourProposalsPage = lazy(() => import("@/pages/content/tour-proposals"));
const DetailTourPage = lazy(() => import("@/pages/content/detail-tour"));
const NotificationPage = lazy(() => import("@/pages/overlay/notification"));
const CartPage = lazy(() => import("@/pages/overlay/cart"));

export function Router() {
  // const isLoading = true;
  // if (isLoading) return <SplashScreen />

  const router = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [

        {
          element: (
            // <ProtectedRoute>
            <AuthRoute>
              <InitLayout type={LAYOUT.MAIN}>
                <Outlet />
              </InitLayout>
            </AuthRoute>
            //  </ProtectedRoute>
          ),
          children: [
            {
              path: paths.content.info,
              element: <InfoPage />,
            },
            {
              path: paths.content.requestBooking,
              element: <RequestBookingPage />,
            },
            {
              path: paths.content.detailRequest,
              element: <DetailRequestPage />,
            },
            {
              path: paths.content.requestCustomize,
              element: <RequestCustomizePage />,
            },
            {
              path: paths.content.detailRequestCustomize,
              element: <DetailRequestCustomizePage />,
            },
            {
              path: paths.content.quote,
              element: <QuotePage />,
            },
            {
              path: paths.content.detaiQuote,
              element: <DetailQuotePage />,
            },
            {
              path: paths.content.service,
              element: <ServicePage />,
            },
            {
              path: paths.content.detailService,
              element: <DetailServicePage />,
            },
            {
              path: paths.content.feedback,
              element: <FeedbackPage />,
            },
            {
              path: paths.content.pricing,
              element: <PricingPage />,
            },
            {
              path: paths.content.reportFinance,
              element: <ReportsFinancePage />,
            },
            {
              path: paths.content.detailReportFinance,
              element: <DetailReportsFinancePage />,
            },
            {
              path: paths.content.reportApproved,
              element: <ReportApprovedPage />,
            },
            {
              path: paths.content.agent,
              element: <AgentPage />,
            },
            {
              path: paths.content.tourBookings,
              element: <TourBookingsPage />,
            },
            {
              path: paths.content.tourCancelled,
              element: <TourCancelledPage />,
            },
            {
              path: paths.content.tourProposals,
              element: <TourProposalsPage />,
            },

          ],
        },

        // AUTH LAYOUT
        {
          element: (
            <InitLayout type={LAYOUT.AUTH}>
              <Outlet />
            </InitLayout>
          ),
          children: [
            {
              path: paths.auth.signIn,
              element: <SignInPage />,
            },
          ],
        },

        // OVERLAY LAYOUT
        {
          element: (
            <AuthRoute>
              <InitLayout type={LAYOUT.OVERLAY}>
                <Outlet />
              </InitLayout>
            </AuthRoute >
          ),
          children: [
            {
              path: paths.overlay.notification,
              element: <NotificationPage />,
            },
            {
              path: paths.overlay.cart,
              element: <CartPage />,
            },

            //path temp of content
            {
              path: paths.content.detailTour,
              element: <DetailTourPage />,
            },
          ],
        },

      ],
    },

    // OUTSIDE LAYOUT
    { path: paths.page404, element: <Page404Page /> },
    { path: "*", element: <Navigate to={paths.page404} replace /> },
    // { path: paths.comingSoon, element: <ComingSoonPage /> },
  ]);
  return router;
}
