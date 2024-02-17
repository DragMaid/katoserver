#include <bits/stdc++.h>
using namespace std;

// APPROACH 1:
//bool isPrime(int num) {
	//if (num == 0 || num == 1) return false;
	//for (int i=2; i*i<=num; i++) if (num % i == 0) return false;
	//return true;
//}


//int getLength(int num) {
	//int i = 0;
	//while (num != 0) {
		//num /= 10; i++;
	//} return i;
//}

//void subPrime(int num) {
	//vector<int> result;
	//int len = getLength(num);
	//int divisor = pow(10, len-1);
	//while (divisor != 0) {
		//int tmp = num;
		//int remain = (tmp / divisor) % 10;
		//divisor /= 10;
		//if (isPrime(remain) && find(result.begin(), result.end(), remain) == result.end()) { 
			//result.push_back(remain);
		//}
	//}
	//if ((int)result.size() == 0) cout << 0;
	//else { for (int i : result) cout << i << " "; }
	//cout << "\n";
//}

//void solve() {
	//int n; cin >> n;
	//for (int i=0; i<n; i++) {
		//int num; cin >> num;
		//if (isPrime(num)) cout << "YES ";
		//else cout << "NO ";
		//subPrime(num);
	//}
//}


int getLength(int num) {
	int i = 0;
	while (num != 0) {
		num /= 10; i++;
	} return i;
}

// APPROACH 2:
void solve() {
	int n; cin >> n;
	int inputs[n];
	int maxI = INT_MIN;
	for (int i=0; i<n; i++) {
		cin >> inputs[i];
		maxI = max(maxI, inputs[i]);
	}

	// Creation of primes array based on largest n number
	bool primes[maxI+1];
	memset(primes, true, sizeof(primes));
	primes[0] = false; primes[1] = false;

    for (int p = 2; p * p <= maxI; p++) {
        if (primes[p] == true) {
            for (int i = p * p; i <= maxI; i += p)
                primes[i] = false;
        }
    }


	for (int i=0; i<n; i++) {
		int target = inputs[i];
		if (primes[target]) cout << "YES ";
		else cout << "NO ";

		// Finding prime of each individual digit
		vector<int> result;
		int len = getLength(target);
		int divisor = pow(10, len-1);
		while (divisor != 0) {
			int tmp = target;
			int remain = (tmp / divisor) % 10;
			divisor /= 10;
			if (primes[remain] && find(result.begin(), result.end(), remain) == result.end()) { 
				result.push_back(remain);
			}
		}
		if ((int)result.size() == 0) cout << 0;
		else { for (int i : result) cout << i << " "; }
		cout << "\n";
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	freopen("PRIME.INP", "r", stdin);
	freopen("PRIME.OUT", "w", stdout);
	solve();
	return 0;
}
