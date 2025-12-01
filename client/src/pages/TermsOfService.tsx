
const TermsOfService = () => {
    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>Terms of Service</h1>

            <div className="card" style={{ padding: '2rem', lineHeight: '1.8' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Introduction</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Welcome to TechStore. By accessing our website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Use License</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Permission is granted to temporarily download one copy of the materials (information or software) on TechStore's website for personal, non-commercial transitory viewing only.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Disclaimer</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    The materials on TechStore's website are provided on an 'as is' basis. TechStore makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>4. Limitations</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    In no event shall TechStore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechStore's website.
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;
