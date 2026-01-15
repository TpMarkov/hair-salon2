import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import {
    Calendar,
    Scissors,
    PlusCircle,
    LayoutDashboard,
    Users,
    Clock,
    ChevronRight,
    Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const {
        adminToken,
        dashData,
        getDashData,
        isConnected
    } = useContext(AdminContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (adminToken) {
            getDashData()
        }
    }, [adminToken, getDashData])

    const stats = [
        {
            label: 'Total Appointments',
            value: dashData ? dashData.appointmentsCount : 0,
            icon: Calendar,
            color: 'text-amber-600',
            bg: 'bg-amber-100'
        },
        {
            label: 'Active Services',
            value: dashData ? dashData.servicesCount : 0,
            icon: Scissors,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: 'System Status',
            value: isConnected ? 'Live' : 'Offline',
            icon: Zap,
            color: isConnected ? 'text-green-600' : 'text-red-600',
            bg: isConnected ? 'bg-green-100' : 'bg-red-100',
            status: true
        }
    ]

    const navCards = [
        {
            title: 'Appointments',
            description: 'Manage bookings, view schedule and update status.',
            icon: Calendar,
            path: '/appointments',
            color: 'from-amber-400 to-amber-600'
        },
        {
            title: 'Services List',
            description: 'View all hair styles and specialized services offered.',
            icon: Scissors,
            path: '/services',
            color: 'from-blue-400 to-blue-600'
        },
        {
            title: 'Add New Service',
            description: 'Expand your salon menu with new trendy styles.',
            icon: PlusCircle,
            path: '/services-list',
            color: 'from-emerald-400 to-emerald-600'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 sm:pt-24 sm:pb-40">
                <div className="absolute inset-0">
                    <img
                        src="/images/Live-Well-in-Strand-cover-.png"
                        alt="Dashboard Background"
                        className="h-full w-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Salon Control <span className="text-amber-500">Center</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-300">
                            Welcome back, Admin. Manage your appointments, services, and salon operations from one powerful interface.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-sm transition-all hover:shadow-md border border-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`rounded-xl ${stat.bg} p-3`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <p className="mt-1 flex items-baseline text-2xl font-bold text-gray-900">
                                        {stat.value}
                                        {stat.status && (
                                            <span className={`ml-2 flex h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions Header */}
                <div className="mt-16 mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Quick Operations</h2>
                        <p className="mt-1 text-sm text-gray-500">Direct shortcuts to your most important tools</p>
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {navCards.map((card, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(card.path)}
                            className="group relative flex flex-col items-start rounded-3xl bg-white p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-100 text-left w-full cursor-pointer"
                        >
                            <div className={`mb-6 rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                                <card.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                {card.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                {card.description}
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-3">
                                Manage Section
                                <ChevronRight className="h-4 w-4" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Recent Activity Placeholder or Future Info */}
                <div className="mt-16 rounded-3xl bg-amber-50 p-8 border border-amber-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-amber-100 p-3">
                                <Clock className="h-6 w-6 text-amber-700" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-amber-900">Salon Operations are Live</h3>
                                <p className="text-amber-700/80 text-sm">Your dashboard is synchronized with real-time data from the salon.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-bold text-amber-700 shadow-sm border border-amber-200">
                                Real-time Sync Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

