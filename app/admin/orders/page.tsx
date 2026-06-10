'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  MessageSquare,
  ChevronDown,
  Lock,
  ArrowRight,
  Database
} from 'lucide-react';
import { Breadcrumbs } from '@/components/LayoutTemplates';

interface OrderItem {
  id: number;
  order_id: string;
  product_slug: string;
  product_name: string;
  variant: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  order_notes: string;
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  created_at: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch orders from API
  const loadOrders = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const url = `/api/admin/orders?search=${encodeURIComponent(search)}&status=${encodeURIComponent(statusFilter)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to retrieve orders logs.');
      }
      setOrders(data.orders || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to load records from D1.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger load on search or filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update order status.');
      }
      
      // Update state locally
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error updating order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats Counters
  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'Pending').length;
    const processing = orders.filter(o => o.status === 'Processing').length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;
    const revenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total_amount, 0);

    return { total, pending, processing, completed, cancelled, revenue };
  }, [orders]);

  return (
    <div className="bg-[#070908] min-h-screen text-white select-none">
      
      {/* Header Splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-10 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'System Administration' }, { name: 'Order Logs Console' }]} />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                Security Administration Dashboard
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1 leading-tight">
                Secure Order Ledger Console
              </h1>
              <p className="font-sans text-xs text-gray-500 mt-1 max-w-xl">
                D1 Database-backed order dispatcher panel. Track real-time transactions, coordinates, and filter printing sheets.
              </p>
            </div>
            
            <button
              onClick={loadOrders}
              disabled={isLoading}
              className="px-4 py-2.5 bg-[#161B22] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl font-mono text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync D1 Records</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* STATS BENTO BLOCKS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Revenue */}
          <div className="bg-[#161B22] border border-slate-850 rounded-2xl p-5 text-left relative overflow-hidden lg:col-span-1">
            <TrendingUp className="w-4 h-4 text-emerald-400 absolute top-5 right-5" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Realized Volume</span>
            <span className="font-display text-xl sm:text-2xl font-black text-white block mt-2 font-mono">
              ${stats.revenue}
            </span>
            <span className="text-[9px] text-emerald-500/80 font-sans block mt-1">Excludes Cancelled</span>
          </div>

          {/* Pending */}
          <div className="bg-[#161B22] border border-slate-850 rounded-2xl p-5 text-left relative overflow-hidden">
            <Clock className="w-4 h-4 text-amber-500 absolute top-5 right-5 animate-pulse" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Pending Review</span>
            <span className="font-display text-xl sm:text-2xl font-black text-amber-500 block mt-2 font-mono">
              {stats.pending}
            </span>
            <span className="text-[9px] text-gray-500 font-sans block mt-1">Needs Invoice Confirm</span>
          </div>

          {/* Processing */}
          <div className="bg-[#161B22] border border-slate-850 rounded-2xl p-5 text-left relative overflow-hidden">
            <RefreshCw className="w-4 h-4 text-[#FF6B1A] absolute top-5 right-5" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Processing Sheets</span>
            <span className="font-display text-xl sm:text-2xl font-black text-[#FF6B1A] block mt-2 font-mono">
              {stats.processing}
            </span>
            <span className="text-[9px] text-gray-500 font-sans block mt-1">Active Fine Pressing</span>
          </div>

          {/* Completed */}
          <div className="bg-[#161B22] border border-slate-850 rounded-2xl p-5 text-left relative overflow-hidden">
            <CheckCircle className="w-4 h-4 text-emerald-500 absolute top-5 right-5" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Dispatched Bricks</span>
            <span className="font-display text-xl sm:text-2xl font-black text-emerald-500 block mt-2 font-mono">
              {stats.completed}
            </span>
            <span className="text-[9px] text-emerald-500/80 font-sans block mt-1">Vacuum Armor Posted</span>
          </div>

          {/* Cancelled */}
          <div className="bg-[#161B22] border border-slate-850 rounded-2xl p-5 text-left relative overflow-hidden">
            <XCircle className="w-4 h-4 text-rose-500 absolute top-5 right-5" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Void/Cancelled</span>
            <span className="font-display text-xl sm:text-2xl font-black text-rose-500 block mt-2 font-mono">
              {stats.cancelled}
            </span>
            <span className="text-[9px] text-gray-500 font-sans block mt-1">Removed Tickets</span>
          </div>

        </div>

        {/* SEARCH AND FILTER SHEET */}
        <div className="bg-[#0f1311] border border-slate-850 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
          
          {/* Search bar */}
          <div className="relative flex-1 w-full text-left">
            <Search className="w-4 h-4 text-slate-600 absolute left-3 w-8 py-3 h-10 top-0 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') loadOrders();
              }}
              placeholder="Search by Order Code, Name, Email, or Phone..."
              className="w-full bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
            />
          </div>

          {/* Search trigger */}
          <button
            onClick={loadOrders}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Query Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Status Filter Tab Buttons */}
          <div className="flex bg-[#070908] p-1 border border-slate-850 rounded-xl overflow-x-auto w-full sm:w-auto">
            {['all', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`py-2 px-3.5 font-mono text-[9px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#161B22] text-emerald-400 font-bold border border-slate-800'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {status === 'all' ? 'All Logs' : status}
              </button>
            ))}
          </div>

        </div>

        {/* ERROR BOX */}
        {errorMsg && (
          <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl text-left flex items-start gap-3">
            <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-[11px] text-rose-400 leading-relaxed explanation">
              {errorMsg}
            </p>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Retrieving Ledger Arrays...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-[#0f1311] border border-slate-850 rounded-2xl">
            <Database className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="font-display font-bold text-base text-white">No Record Entries Found</h3>
            <p className="text-slate-500 font-sans text-xs max-w-sm mx-auto leading-relaxed mt-2">
              There are currently no orders in the D1 database matching your filters. Complete a purchase on our checkout register to seed values.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/products"
                className="px-5 py-2.5 bg-[#161B22] border border-slate-800 hover:border-slate-705 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                Assemble Test Order
              </Link>
            </div>
          </div>
        ) : (
          /* ORDERS LOOP */
          <div className="divide-y divide-slate-850 bg-[#0f1311] border border-slate-850 rounded-3xl overflow-hidden shadow-2xl text-left">
            {orders.map((order) => (
              <div key={order.id} className="p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-start hover:bg-slate-900/10 transition-colors">
                
                {/* 1. Ticket info & customers metadata (5 cols) */}
                <div className="space-y-4 lg:w-5/12 text-left">
                  
                  {/* Status header badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-900 px-3 py-1 border border-slate-800 rounded-lg">
                      {order.order_number}
                    </span>
                    
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${
                      order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      order.status === 'Processing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      ● {order.status}
                    </span>

                    <span className="text-[10px] font-mono text-slate-500 ml-auto">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Customer details box */}
                  <div className="space-y-2 text-xs font-sans text-gray-300 bg-black/20 p-4 border border-slate-850 rounded-xl select-text">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-2 text-gray-500 font-mono text-[9px] uppercase font-bold tracking-wider">
                      <User className="w-3.5 h-3.5 text-slate-500" /> Buyer Profile Diagnostics
                    </div>
                    <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" /> <span>{order.first_name} {order.last_name}</span></div>
                    <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" /> <a href={`mailto:${order.email}`} className="hover:text-emerald-400 underline">{order.email}</a></div>
                    <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" /> <span>{order.phone}</span></div>
                    <div className="flex items-start gap-2 pt-1 border-t border-slate-900/45 mt-2"><MapPicMapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" /> <span className="leading-relaxed">{order.shipping_address}</span></div>
                  </div>

                  {/* Customer Notes */}
                  {order.order_notes && (
                    <div className="bg-amber-950/10 border border-amber-500/10 p-3.5 rounded-xl text-xs text-amber-400 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[9px] uppercase font-bold text-amber-500 block mb-0.5">Order Instructions Notes</span>
                        <p className="font-sans leading-relaxed">{order.order_notes}</p>
                      </div>
                    </div>
                  )}

                  {/* UPDATE ORDER STATUS COMPONENT */}
                  <div className="bg-black/10 border border-slate-850 p-3.5 rounded-xl flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-mono text-[9px] uppercase font-extrabold tracking-wider text-slate-500">
                      Edit Status:
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {['Pending', 'Processing', 'Completed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          disabled={updatingId !== null}
                          onClick={() => handleUpdateStatus(order.id, st)}
                          className={`py-1 px-2.2 text-[9px] font-mono rounded-md font-bold uppercase transition-all tracking-wider cursor-pointer ${
                            order.status === st
                              ? 'bg-emerald-500 text-black font-extrabold'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 2. Items Bought recap table list (7 cols) */}
                <div className="flex-1 w-full lg:w-7/12 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" /> Stock Listing Details
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-0.5 rounded">
                      Total: ${order.total_amount} USD
                    </span>
                  </div>

                  <table className="w-full text-left border-collapse border border-slate-850/60 bg-black/10 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="border-b border-slate-850 bg-black/30 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                        <th className="p-3">Product Item Name</th>
                        <th className="p-3 text-center w-24">Variant</th>
                        <th className="p-3 text-center w-20">Price</th>
                        <th className="p-3 text-center w-16">Qty</th>
                        <th className="p-3 text-right w-24">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-[11px] text-gray-300">
                      {order.items && order.items.map((itm) => (
                        <tr key={itm.id} className="border-b border-slate-850/50 hover:bg-slate-900/5">
                          <td className="p-3 font-semibold text-white">{itm.product_name}</td>
                          <td className="p-3 text-center"><span className="bg-slate-850 text-slate-350 px-2 py-0.5 rounded text-[9.5px] font-mono uppercase">{itm.variant}</span></td>
                          <td className="p-3 text-center font-mono text-slate-400">${itm.price}</td>
                          <td className="p-3 text-center font-mono font-bold text-white">{itm.qty}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-400">${itm.price * itm.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="bg-[#161B22]/40 rounded-xl p-3 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase select-none">
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-slate-600" /> Handled Securely</span>
                    <span>Ticket: {order.id.slice(0, 8).toUpperCase()}</span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )
        }

      </section>

    </div>
  );
}

// Wrapper to fix MapPin icon typing issue in copy
function MapPicMapPin(props: any) {
  return <MapPin className={props.className} />;
}
