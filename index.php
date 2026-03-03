<?php
/**
 * UAE Creators - Premium UGC Community
 * cPanel Compatible Version (PHP + Vanilla JS)
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UAE Creators | Premium UGC Community</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
        }
        h1, h2, h3, h4, .font-heading {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .teal-gradient {
            background: linear-gradient(135deg, #1FAE9A 0%, #2FB7A3 100%);
        }
        .shadow-soft {
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
        }
        [x-cloak] { display: none !important; }
    </style>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1FAE9A',
                        secondary: '#2FB7A3',
                        bgMain: '#F9FAFB',
                        heading: '#0F172A',
                        body: '#6B7280',
                        accent: '#D1FAE5',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#F9FAFB] text-[#6B7280] overflow-x-hidden">

    <?php include 'php-components/navbar.php'; ?>

    <main>
        <?php include 'php-components/hero.php'; ?>
        <?php include 'php-components/trust-bar.php'; ?>
        <?php include 'php-components/value-prop.php'; ?>
        <?php include 'php-components/how-it-works.php'; ?>
        <?php include 'php-components/brand-partners.php'; ?>
        <?php include 'php-components/ai-feature.php'; ?>
    </main>

    <?php include 'php-components/footer.php'; ?>
    <?php include 'php-components/creator-modal.php'; ?>

    <!-- App Logic -->
    <script src="assets/js/app.js"></script>
    <script>
        // Initialize Lucide icons
        lucide.createIcons();
    </script>
</body>
</html>
