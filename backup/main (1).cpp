#include<bits/stdc++.h>
using namespace std;

void solve();

int main() {
#ifndef ONLINE_JUDGE
    freopen("MAXNUM.INP", "r", stdin);
    freopen("MAXNUM.OUT", "w", stdout);
#endif
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    solve();
    return 0;
}

void solve() {
    int N;
    cin >> N;

    int arr[N];
    vector< pair<int, int> > p_con;

    for (int i=0; i<N; i++) {
        int tmp; cin >> tmp;
        arr[i] = tmp;

        if (tmp < 10) { tmp *= 11; }
        p_con.push_back( make_pair(tmp, i) );
    }

    sort(p_con.begin(), p_con.end());

    string str;
    for (int i=N-1; i!=0; i--) {
        str += c_str(arr[p_con[i].second]);
    }

    cout << str << endl;
}
