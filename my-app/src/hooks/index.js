import { useContext } from 'react';
import { AuthContext, WebSocketsContext, FilterLeoContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useWebSockets = () => useContext(WebSocketsContext);

export const useFilterLeoContext = () => useContext(FilterLeoContext);
