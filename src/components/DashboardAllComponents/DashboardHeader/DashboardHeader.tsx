// @ts-check
import { User } from 'lucide-react';
import './DashboardHeader.css';

const DashboardHeader = () => {
    const handleSignOut = () => {
        // TODO: Implement sign out functionality
        console.log('Sign out clicked');
    };

    return (
        <header className="dashboard-header-container">
            <div className="dashboard-header-content">
                <div className="dashboard-header-right">
                    <span className="dashboard-header-username">Super Admin</span>
                    <div className="dashboard-header-profile-icon">
                        <User size={20} />
                    </div>
                    <button 
                        className="dashboard-header-signout-btn"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

