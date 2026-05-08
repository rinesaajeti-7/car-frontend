// Home.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import CarCard from '../components/CarCard';
import SearchBar from '../components/SearchBar';
import styles from './Home.module.css';

const Home = () => {
    // const [cars, setCars] = useState([]);
    const [lastThreeCars, setLastThreeCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Calculator state
    const [carPrice, setCarPrice] = useState('');
    const [carYear, setCarYear] = useState('');
    const [engineCC, setEngineCC] = useState('');
    const [customsTotal, setCustomsTotal] = useState(0);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setError(null);
            const response = await axios.get('/cars');
            const allCars = response.data;
            // setCars(allCars);
            // Get last 3 cars (assuming newest by id descending or createdAt)
            const sorted = [...allCars].sort((a, b) => b.id - a.id);
            setLastThreeCars(sorted.slice(0, 3));
        } catch (err) {
            console.error('Error fetching cars:', err);
            setError('Failed to load cars. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Customs calculator logic
    useEffect(() => {
        if (carPrice && carYear && engineCC) {
            const price = parseFloat(carPrice);
            const year = parseInt(carYear);
            const cc = parseFloat(engineCC);
            if (isNaN(price) || isNaN(year) || isNaN(cc)) {
                setCustomsTotal(0);
                return;
            }
            // Tax 10% on car price
            const tax = price * 0.10;
            // Excise based on CC and year (simplified formula)
            let exciseRate = 0;
            if (cc <= 2000) exciseRate = 0.15;
            else if (cc <= 3000) exciseRate = 0.25;
            else exciseRate = 0.35;
            // older cars have lower excise? For demo, same rate
            const excise = price * exciseRate;
            const subtotal = price + tax + excise;
            const vat = subtotal * 0.18;
            const total = subtotal + vat;
            setCustomsTotal(total);
        } else {
            setCustomsTotal(0);
        }
    }, [carPrice, carYear, engineCC]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading amazing cars...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={fetchCars} className={styles.retryButton}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={styles.home}>
            {/* Hero Section with Search */}
            <div className={styles.hero}>
                <h1>Discover Your Next Ride</h1>
                <p>Find the perfect car from our curated collection</p>
                <br/>
                <div className={styles.searchSection}>
                    <SearchBar />
                </div>
            </div>

            {/* Latest 3 Cars Section */}
            <div className={styles.latestSection}>
                <h2>Latest Arrivals</h2>
                <div className={styles.carsGrid}>
                    {lastThreeCars.length > 0 ? (
                        lastThreeCars.map(car => <CarCard key={car.id} car={car} />)
                    ) : (
                        <p>No cars available at the moment.</p>
                    )}
                </div>
            </div>

            {/* Buying Process */}
            <div className={styles.processSection}>
                <h2>Procesi i Blerjes</h2>
                <p className={styles.subtitle}>Procesi i thjeshtë dhe i sigurt për të blerë veturën tuaj të ëndrrave</p>
                <div className={styles.stepsGrid}>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>HAPI 1</div>
                        <h3>Zgjidh veturën</h3>
                        <p>Shfleto koleksionin tonë premium të makinave të disponueshme dhe gjej veturën perfekte që plotëson të gjitha nevojat tuaja</p>
                    </div>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>HAPI 2</div>
                        <h3>Merr Raportin</h3>
                        <p>Agjentët tanë në Kore të Jugut e bëjnë inspektimin e detajuar të veturës dhe ju dërgojmë një raport të plotë me foto dhe video</p>
                    </div>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>HAPI 3</div>
                        <h3>Kontrata dhe pagesa</h3>
                        <p>Nëse klienti vendos për veturën, ne përgatisim kontratën dhe fillojmë procesin e pagesës dhe dokumentacionit</p>
                    </div>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>HAPI 4</div>
                        <h3>Dorëzimi i veturës</h3>
                        <p>Pas procesit të transportit që zgjat rreth 33 ditë, makina juaj arrinë në terminal doganor</p>
                    </div>
                </div>
                <div className={styles.ctaButton}>
                    <button className={styles.primaryBtn}>Porosit veturën tënde sot!</button>
                    <p className={styles.ctaText}>Fillo udhëtimin drejt veturës së ëndrrave tua</p>
                </div>
            </div>

            {/* About Us + Stats */}
            <div className={styles.aboutSection}>
                <div className={styles.aboutContent}>
                    <h2>Rreth Nesh</h2>
                    <p>CarMenager është kompani e specializuar në importimin e veturave të përzgjedhura nga Korea e Jugut për tregjet e Kosovës dhe Shqipërisë. Ne besojmë se çdo klient meriton një veturë në gjendje të shkëlqyer — prandaj procesi ynë fillon me inspektime profesionale dhe të detajuara në vend, të kryera nga ekipet profesionale në Kore.</p>
                    <p>Ne dallojmë për transparencë, korrektësi dhe çmime konkurruese — synimi ynë është të ofrojmë veturën më të mirë me çmimin më të mirë. Për çdo pyetje, inspektim të personalizuar ose ofertë, ekipi ynë është gjithmonë i gatshëm t'ju ndihmojë.</p>

                </div>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>500+</span>
                        <span className={styles.statLabel}>Vetura të Importuara</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>98%</span>
                        <span className={styles.statLabel}>Klientë të Kënaqur</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>5+</span>
                        <span className={styles.statLabel}>Vjet Eksperiencë</span>
                    </div>
                </div>
            </div>

            {/* Customs Calculator */}
            <div className={styles.calculatorSection}>
                <h2>KALKULATORI I DOGANËS</h2>
                <p>Llogarit koston doganës për veturën tënde</p>
                <div className={styles.calculatorForm}>
                    <div className={styles.inputGroup}>
                        <label>Çmimi i Veturës (EUR)</label>
                        <input
                            type="number"
                            placeholder="Sheno çmimin"
                            value={carPrice}
                            onChange={(e) => setCarPrice(e.target.value)}
                        />
                        <span>€</span>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Viti i Prodhimit</label>
                        <input
                            type="number"
                            placeholder="Viti"
                            value={carYear}
                            onChange={(e) => setCarYear(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Kapaciteti i Motorit (CC)</label>
                        <input
                            type="number"
                            placeholder="Sheno CC"
                            value={engineCC}
                            onChange={(e) => setEngineCC(e.target.value)}
                        />
                        <span>cc</span>
                    </div>
                    <div className={styles.resultBox}>
                        <p>Totali i Taksave Doganore</p>
                        <p className={styles.resultAmount}>{customsTotal.toLocaleString()} €</p>
                        <small>Ky është një vlerësim përafërt i taksave doganore. Kontaktoni për një llogaritje të saktë.</small>
                        <div className={styles.breakdown}>
                            <span>TAKSA 10%</span>
                            <span>Mbi çmimin e veturës</span>
                            <span>AKCIZA</span>
                            <span>Bazuar në CC dhe vit</span>
                            <span>TVSH 18%</span>
                            <span>Mbi total (çmim+taksë+akcizë)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact / CTA */}
            <div className={styles.contactSection}>
                <div className={styles.contactCard}>
                    <h3>Na Kontaktoni Tani</h3>
                    <p>Import cilësor direkt nga Korea Jugore</p>
                    <button className={styles.secondaryBtn}>Kontakto</button>
                </div>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <span>✓</span>
                        <div>
                            <strong>Cilësi e Garantuar</strong>
                            <p>Siguri dhe Besueshmëri</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <span>✓</span>
                        <div>
                            <strong>Transparencë e Plotë</strong>
                            <p>Të gjitha detajet e veturës janë të qarta dhe të dokumentuara plotësisht</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <span>✓</span>
                        <div>
                            <strong>Cilësi e garantuar</strong>
                            <p>Vetura të zgjedhura me kujdes dhe të inspektuara nga ekspertët tanë</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;