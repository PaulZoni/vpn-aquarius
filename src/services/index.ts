import {Vpn} from './vpn/ApiVpn';
interface FakeApolloClient {}
export type fakeApolloClient = FakeApolloClient;
interface InterstitialAdI {
  show: () => void;
}
type InterstitialAd = InterstitialAdI;

const authService = {};

export interface CreateServices {
  apiGatewayClient: fakeApolloClient;
  InterstitialAdModule: InterstitialAd;
}

export const createServices = ({
  apiGatewayClient,
  InterstitialAdModule,
}: CreateServices) => ({
  authService,
  apiGatewayService: apiGatewayClient,
  InterstitialAdModule,
  apiVpn: Vpn,
});
