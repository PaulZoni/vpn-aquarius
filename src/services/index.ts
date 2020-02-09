import {Vpn} from './vpn/ApiVpn';
interface FakeApolloClient {}
export type fakeApolloClient = FakeApolloClient;

interface HistoryInterface {}
type History = HistoryInterface;

const authService = {};

export interface CreateServices {
  apiGatewayClient: fakeApolloClient;
  history: History;
}

export const createServices = ({
  apiGatewayClient,
  history,
}: CreateServices) => ({
  authService,
  apiGatewayService: apiGatewayClient,
  history,
  apiVpn: Vpn,
});
